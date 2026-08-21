import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// API 서버 중단 상태.
// 아래 공개 경로만 접속을 허용하고, 나머지는 모두 메인(/)으로 돌려보낸다.
// (랭킹/점수분석/프로필 등 API 서버 의존 페이지는 제외)
const PUBLIC_PATHS = ['/', '/editor', '/table', '/skill', '/tools/viewer']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = '/'
  url.search = ''
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|table|assets|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
}
