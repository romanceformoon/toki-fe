import type { NextApiRequest, NextApiResponse } from 'next'
import { buildAdminCookie, createAdminToken } from '~/utils/adminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.' })
  }

  const { password } = (req.body ?? {}) as { password?: string }
  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: '비밀번호가 올바르지 않습니다.' })
  }

  try {
    const token = await createAdminToken()
    res.setHeader('Set-Cookie', buildAdminCookie(token))
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('관리자 토큰 생성 실패:', err)
    return res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' })
  }
}
