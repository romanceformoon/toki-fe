import type { NextApiRequest, NextApiResponse } from 'next'
import { ADMIN_COOKIE, verifyAdminToken } from '~/utils/adminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const admin = await verifyAdminToken(req.cookies[ADMIN_COOKIE])
  return res.status(200).json({ admin })
}
