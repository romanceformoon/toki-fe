import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdmin } from '~/utils/adminAuth'
import { isValidNamespace, readTableData, writeTableData } from '~/utils/blobStore'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb'
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { namespace } = req.query
  if (typeof namespace !== 'string' || !isValidNamespace(namespace)) {
    return res.status(400).json({ error: '유효하지 않은 테이블입니다.' })
  }

  if (req.method === 'GET') {
    try {
      const data = await readTableData(namespace)
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=30, stale-while-revalidate=60')
      return res.status(200).json(data)
    } catch (err) {
      console.error(`테이블 조회 실패 (${namespace}):`, err)
      return res.status(502).json({ error: '데이터를 불러오지 못했습니다.' })
    }
  }

  if (req.method === 'PUT') {
    const authorized = await requireAdmin(req, res)
    if (!authorized) return

    const body = req.body
    if (!Array.isArray(body)) {
      return res.status(400).json({ error: '요청 본문은 배열이어야 합니다.' })
    }

    try {
      await writeTableData(namespace, body as ISongData[])
      return res.status(200).json({ ok: true, count: body.length })
    } catch (err) {
      console.error(`테이블 저장 실패 (${namespace}):`, err)
      return res.status(500).json({ error: '데이터를 저장하지 못했습니다.' })
    }
  }

  res.setHeader('Allow', 'GET, PUT')
  return res.status(405).json({ error: 'Method Not Allowed' })
}
