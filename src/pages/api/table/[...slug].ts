import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdmin } from '~/utils/adminAuth'
import { isValidFile, isValidNamespace, readTableFile, writeTableFile } from '~/utils/blobStore'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb'
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  if (!Array.isArray(slug) || slug.length !== 2) {
    return res.status(400).json({ error: '경로 형식이 올바르지 않습니다. (/{namespace}/{file})' })
  }

  const [namespace, file] = slug
  if (!isValidNamespace(namespace) || !isValidFile(file)) {
    return res.status(400).json({ error: '유효하지 않은 테이블 또는 파일입니다.' })
  }

  if (req.method === 'GET') {
    try {
      const data = await readTableFile(namespace, file)
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=30, stale-while-revalidate=60')
      return res.status(200).json(data)
    } catch (err) {
      console.error(`테이블 조회 실패 (${namespace}/${file}):`, err)
      return res.status(502).json({ error: '데이터를 불러오지 못했습니다.' })
    }
  }

  if (req.method === 'PUT') {
    const authorized = await requireAdmin(req, res)
    if (!authorized) return

    const body = req.body

    // data.json은 곡 배열, header.json은 메타데이터 객체
    if (file === 'data.json' && !Array.isArray(body)) {
      return res.status(400).json({ error: 'data.json 본문은 배열이어야 합니다.' })
    }
    if (file === 'header.json' && (typeof body !== 'object' || body === null || Array.isArray(body))) {
      return res.status(400).json({ error: 'header.json 본문은 객체여야 합니다.' })
    }

    try {
      await writeTableFile(namespace, file, body)
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error(`테이블 저장 실패 (${namespace}/${file}):`, err)
      return res.status(500).json({ error: '데이터를 저장하지 못했습니다.' })
    }
  }

  res.setHeader('Allow', 'GET, PUT')
  return res.status(405).json({ error: 'Method Not Allowed' })
}
