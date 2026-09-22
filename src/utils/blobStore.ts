import { list, put } from '@vercel/blob'

export type TableNamespace = 'aery' | 'aery7'
export type TableFile = 'data.json' | 'header.json'

export const isValidNamespace = (value: string): value is TableNamespace =>
  value === 'aery' || value === 'aery7'

export const isValidFile = (value: string): value is TableFile =>
  value === 'data.json' || value === 'header.json'

const GITHUB_SEED_BASE =
  process.env.TABLE_SEED_BASE_URL ||
  'https://raw.githubusercontent.com/romanceformoon/toki-be/refs/heads/main/table'

const BLOB_CACHE_MAX_AGE = 60
const MEMORY_CACHE_TTL_MS = 60 * 1000

const blobPath = (namespace: TableNamespace, file: TableFile) => `table/${namespace}/${file}`

const getToken = () => process.env.BLOB_READ_WRITE_TOKEN

// 서버 인스턴스가 살아있는 동안 재사용하는 메모리 캐시.
// 같은 인스턴스로 들어온 반복 요청이 Blob까지 나가지 않게 막는다.
const memoryCache = new Map<string, { text: string; expiresAt: number }>()

const readCache = (pathname: string): string | null => {
  const entry = memoryCache.get(pathname)
  if (!entry || entry.expiresAt <= Date.now()) return null
  return entry.text
}

const writeCache = (pathname: string, text: string) => {
  memoryCache.set(pathname, { text, expiresAt: Date.now() + MEMORY_CACHE_TTL_MS })
}

// list()로 실제 URL을 확인했을 때 기억해 두는 베이스 URL (추론이 빗나간 경우 대비)
let verifiedBaseUrl: string | null = null

// 고정 경로(addRandomSuffix: false)로 저장하므로 공개 URL을 계산할 수 있다.
// list()는 Blob advanced operation이라 읽기마다 호출하면 Hobby 쿼터를 금방 소진한다.
// 토큰 형식: vercel_blob_rw_<storeId>_<secret>
const getPublicBaseUrl = (token: string | undefined): string | null => {
  if (verifiedBaseUrl) return verifiedBaseUrl

  const configured = process.env.BLOB_BASE_URL
  if (configured) return configured.replace(/\/+$/, '')
  if (!token) return null

  const storeId = token.split('_')[3]
  if (!storeId) return null
  return `https://${storeId.toLowerCase()}.public.blob.vercel-storage.com`
}

// 추론한 URL이 통하지 않을 때만 쓰는 폴백. 한 번 찾으면 베이스 URL을 기억해
// 이후 읽기는 다시 직접 fetch로 처리한다.
const lookupUrlViaList = async (pathname: string, token: string): Promise<string | null> => {
  const { blobs } = await list({ prefix: pathname, token })
  const target = blobs.find(blob => blob.pathname === pathname)
  if (!target) return null

  const suffix = `/${pathname}`
  if (target.url.endsWith(suffix)) {
    verifiedBaseUrl = target.url.slice(0, -suffix.length)
  }
  return target.url
}

// GitHub 원본에서 초기 데이터를 가져오는 시드 폴백 (원본 텍스트 그대로)
const fetchSeedFile = async (namespace: TableNamespace, file: TableFile): Promise<string> => {
  const response = await fetch(`${GITHUB_SEED_BASE}/${namespace}/${file}`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error(`시드 데이터를 불러오지 못했습니다 (${file}, ${response.status})`)
  }
  return response.text()
}

// Blob에서 파일을 읽고, 없으면 GitHub 시드로 폴백.
// 재직렬화하지 않고 원본 JSON 텍스트를 그대로 반환한다
// (0.0 → 0 같은 표현 변형 방지: beatoraja 단위인정 파서 호환).
export const readTableFile = async (
  namespace: TableNamespace,
  file: TableFile
): Promise<string> => {
  const pathname = blobPath(namespace, file)

  const cached = readCache(pathname)
  if (cached !== null) return cached

  const token = getToken()
  if (token) {
    try {
      const baseUrl = getPublicBaseUrl(token)
      let response = baseUrl ? await fetch(`${baseUrl}/${pathname}`) : null

      if (!response || !response.ok) {
        const url = await lookupUrlViaList(pathname, token)
        response = url ? await fetch(url) : null
      }

      if (response && response.ok) {
        const text = await response.text()
        writeCache(pathname, text)
        return text
      }
    } catch (err) {
      console.error(`Blob 읽기 실패, 시드로 폴백합니다 (${pathname}):`, err)
    }
  }

  const seed = await fetchSeedFile(namespace, file)
  writeCache(pathname, seed)
  return seed
}

// Blob에 파일을 저장 (고정 경로 덮어쓰기, 관리자 전용)
export const writeTableFile = async (
  namespace: TableNamespace,
  file: TableFile,
  data: unknown
): Promise<void> => {
  const token = getToken()
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN 환경변수가 설정되지 않았습니다.')
  }

  const pathname = blobPath(namespace, file)
  const text = JSON.stringify(data, null, '\t')

  const { url } = await put(pathname, text, {
    access: 'public',
    token,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: BLOB_CACHE_MAX_AGE
  })

  const suffix = `/${pathname}`
  if (url.endsWith(suffix)) {
    verifiedBaseUrl = url.slice(0, -suffix.length)
  }

  writeCache(pathname, text)
}
