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

const blobPath = (namespace: TableNamespace, file: TableFile) => `table/${namespace}/${file}`

const getToken = () => process.env.BLOB_READ_WRITE_TOKEN

// GitHub 원본에서 초기 데이터를 가져오는 시드 폴백
const fetchSeedFile = async (namespace: TableNamespace, file: TableFile): Promise<unknown> => {
  const response = await fetch(`${GITHUB_SEED_BASE}/${namespace}/${file}`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error(`시드 데이터를 불러오지 못했습니다 (${file}, ${response.status})`)
  }
  return response.json()
}

// Blob에서 파일을 읽고, 없으면 GitHub 시드로 폴백
export const readTableFile = async (
  namespace: TableNamespace,
  file: TableFile
): Promise<unknown> => {
  const token = getToken()
  const pathname = blobPath(namespace, file)

  if (token) {
    try {
      const { blobs } = await list({ prefix: pathname, token })
      const target = blobs.find(blob => blob.pathname === pathname)
      if (target) {
        const response = await fetch(target.url, { cache: 'no-store' })
        if (response.ok) {
          return response.json()
        }
      }
    } catch (err) {
      console.error(`Blob 읽기 실패, 시드로 폴백합니다 (${pathname}):`, err)
    }
  }

  return fetchSeedFile(namespace, file)
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

  await put(blobPath(namespace, file), JSON.stringify(data, null, '\t'), {
    access: 'public',
    token,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0
  })
}
