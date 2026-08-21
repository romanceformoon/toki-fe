import type { NextApiRequest, NextApiResponse } from 'next'
import { buildClearCookie } from '~/utils/adminAuth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  res.setHeader('Set-Cookie', buildClearCookie())
  return res.status(200).json({ ok: true })
}
