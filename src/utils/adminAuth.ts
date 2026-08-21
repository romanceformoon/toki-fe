import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT, jwtVerify } from 'jose'

export const ADMIN_COOKIE = 'toki_admin'
const MAX_AGE_SECONDS = 60 * 60 * 12 // 12시간

const getSecretKey = () => {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET 환경변수가 설정되지 않았습니다.')
  }
  return new TextEncoder().encode(secret)
}

export const createAdminToken = async () => {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecretKey())
}

export const verifyAdminToken = async (token: string | undefined) => {
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload.role === 'admin'
  } catch (err) {
    return false
  }
}

export const buildAdminCookie = (token: string) => {
  const isProd = process.env.NODE_ENV === 'production'
  const parts = [
    `${ADMIN_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${MAX_AGE_SECONDS}`
  ]
  if (isProd) parts.push('Secure')
  return parts.join('; ')
}

export const buildClearCookie = () => {
  const isProd = process.env.NODE_ENV === 'production'
  const parts = [`${ADMIN_COOKIE}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0']
  if (isProd) parts.push('Secure')
  return parts.join('; ')
}

export const requireAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAdmin = await verifyAdminToken(req.cookies[ADMIN_COOKIE])
  if (!isAdmin) {
    res.status(401).json({ error: '관리자 인증이 필요합니다.' })
    return false
  }
  return true
}
