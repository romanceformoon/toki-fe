import { Redis } from '@upstash/redis'

export type TableNamespace = 'aery' | 'aery7'
export type TableFile = 'data.json' | 'header.json'

const NAMESPACES: TableNamespace[] = ['aery', 'aery7']
const FILES: TableFile[] = ['data.json', 'header.json']

export const isValidNamespace = (value: string): value is TableNamespace =>
  value === 'aery' || value === 'aery7'

export const isValidFile = (value: string): value is TableFile =>
  value === 'data.json' || value === 'header.json'

const GITHUB_SEED_BASE =
  process.env.TABLE_SEED_BASE_URL ||
  'https://raw.githubusercontent.com/romanceformoon/toki-be/refs/heads/main/table'

const VERSION_CHECK_INTERVAL_MS = 60 * 1000

const dataKey = (namespace: TableNamespace, file: TableFile) => `table:${namespace}:${file}`
const versionKey = (namespace: TableNamespace, file: TableFile) => `${dataKey(namespace, file)}:version`

const ALL_VERSION_KEYS = NAMESPACES.flatMap((namespace) =>
  FILES.map((file) => versionKey(namespace, file))
)

let redis: Redis | null = null

// Vercel Marketplace 연동은 KV_*, Upstash 콘솔 직접 생성은 UPSTASH_* 이름으로 주입된다.
// 자동 역직렬화를 끄지 않으면 JSON이 객체로 파싱되어 0.0 → 0 같은 표현 변형이 생긴다
// (beatoraja 단위인정 파서 호환을 위해 원본 텍스트를 그대로 유지해야 함).
const getRedis = (): Redis | null => {
  if (redis) return redis

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  redis = new Redis({ url, token, automaticDeserialization: false })
  return redis
}

// 무료 플랜은 월 대역폭 10GB 제한이라 큰 data.json을 매번 다시 받으면 금방 소진된다.
// 1분마다 버전 키(수 바이트)만 한 번에 확인하고, 버전이 바뀐 파일만 본문을 다시 받는다.
const memoryCache = new Map<string, { text: string; version: string | null }>()

let versionSnapshot: { versions: Map<string, string | null>; checkedAt: number } | null = null
let pendingVersionCheck: Promise<Map<string, string | null>> | null = null

const fetchVersions = async (client: Redis): Promise<Map<string, string | null>> => {
  const values = await client.mget<(string | null)[]>(...ALL_VERSION_KEYS)
  return new Map(ALL_VERSION_KEYS.map((key, index) => [key, values[index] ?? null]))
}

const getVersions = async (client: Redis): Promise<Map<string, string | null>> => {
  if (versionSnapshot && Date.now() - versionSnapshot.checkedAt < VERSION_CHECK_INTERVAL_MS) {
    return versionSnapshot.versions
  }

  if (!pendingVersionCheck) {
    pendingVersionCheck = fetchVersions(client)
      .then((versions) => {
        versionSnapshot = { versions, checkedAt: Date.now() }
        return versions
      })
      .finally(() => {
        pendingVersionCheck = null
      })
  }
  return pendingVersionCheck
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

const readFromRedis = async (
  client: Redis,
  namespace: TableNamespace,
  file: TableFile
): Promise<string | null> => {
  const key = dataKey(namespace, file)
  const versions = await getVersions(client)
  const version = versions.get(versionKey(namespace, file)) ?? null

  // 버전 키가 없으면 아직 저장된 적 없는 파일 → 시드 폴백
  if (version === null) return null

  const cached = memoryCache.get(key)
  if (cached && cached.version === version) return cached.text

  const text = await client.get<string>(key)
  if (text === null) return null

  memoryCache.set(key, { text, version })
  return text
}

// Redis에서 파일을 읽고, 없으면 GitHub 시드로 폴백.
// 재직렬화하지 않고 원본 JSON 텍스트를 그대로 반환한다.
export const readTableFile = async (
  namespace: TableNamespace,
  file: TableFile
): Promise<string> => {
  const key = dataKey(namespace, file)
  const client = getRedis()

  if (client) {
    try {
      const text = await readFromRedis(client, namespace, file)
      if (text !== null) return text
    } catch (err) {
      console.error(`Redis 읽기 실패 (${key}):`, err)
      const stale = memoryCache.get(key)
      if (stale) return stale.text
    }
  }

  const cached = memoryCache.get(key)
  if (cached && cached.version === null) return cached.text

  const seed = await fetchSeedFile(namespace, file)
  memoryCache.set(key, { text: seed, version: null })
  return seed
}

// Redis에 파일을 저장 (본문과 버전을 함께 갱신, 관리자 전용)
export const writeTableFile = async (
  namespace: TableNamespace,
  file: TableFile,
  data: unknown
): Promise<void> => {
  const client = getRedis()
  if (!client) {
    throw new Error('Redis 환경변수(KV_REST_API_URL/KV_REST_API_TOKEN 또는 UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN)가 설정되지 않았습니다.')
  }

  const key = dataKey(namespace, file)
  const text = JSON.stringify(data, null, '\t')
  const version = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

  await client.multi().set(key, text).set(versionKey(namespace, file), version).exec()

  memoryCache.set(key, { text, version })
  versionSnapshot?.versions.set(versionKey(namespace, file), version)
}
