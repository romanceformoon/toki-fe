import { list, put } from '@vercel/blob'

export type TableNamespace = 'aery' | 'aery7'

export const isValidNamespace = (value: string): value is TableNamespace =>
  value === 'aery' || value === 'aery7'

const GITHUB_SEED_BASE =
  process.env.TABLE_SEED_BASE_URL ||
  'https://raw.githubusercontent.com/romanceformoon/toki-be/refs/heads/main/table'

const blobPath = (namespace: TableNamespace) => `table/${namespace}/data.json`

const getToken = () => process.env.BLOB_READ_WRITE_TOKEN

// GitHub 원본에서 초기 데이터를 가져오는 시드 폴백
const fetchSeedData = async (namespace: TableNamespace): Promise<ISongData[]> => {
  const response = await fetch(`${GITHUB_SEED_BASE}/${namespace}/data.json`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error(`시드 데이터를 불러오지 못했습니다 (${response.status})`)
  }
  return (await response.json()) as ISongData[]
}

// Blob에서 테이블 데이터를 읽고, 없으면 GitHub 시드로 폴백
export const readTableData = async (namespace: TableNamespace): Promise<ISongData[]> => {
  const token = getToken()
  const pathname = blobPath(namespace)

  if (token) {
    try {
      const { blobs } = await list({ prefix: pathname, token })
      const target = blobs.find(blob => blob.pathname === pathname)
      if (target) {
        const response = await fetch(target.url, { cache: 'no-store' })
        if (response.ok) {
          return (await response.json()) as ISongData[]
        }
      }
    } catch (err) {
      console.error(`Blob 읽기 실패, 시드로 폴백합니다 (${namespace}):`, err)
    }
  }

  return fetchSeedData(namespace)
}

// Blob에 테이블 데이터를 저장 (고정 경로 덮어쓰기)
export const writeTableData = async (
  namespace: TableNamespace,
  data: ISongData[]
): Promise<void> => {
  const token = getToken()
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN 환경변수가 설정되지 않았습니다.')
  }

  await put(blobPath(namespace), JSON.stringify(data, null, '\t'), {
    access: 'public',
    token,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0
  })
}
