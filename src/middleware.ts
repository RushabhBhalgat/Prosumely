import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Force HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    url.protocol = 'https:'
    return NextResponse.redirect(url)
  }

  // Redirect non-www to www for canonical consistency
  if (process.env.NODE_ENV === 'production' && hostname === 'prosumely.com') {
    url.host = 'www.prosumely.com'
    return NextResponse.redirect(url, 301)
  }

  // Remove trailing slashes except for root
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  // Handle common broken URLs and set up redirects
  const redirectMap: Record<string, string> = {
    '/home': '/',
    '/index': '/',
    '/index.html': '/',
    '/resume-writing': '/ats-resume-writing-service',
    '/cv-writing': '/academic-cv-writing-service',
    '/linkedin': '/linkedin-profile-makeover',
    '/interview-prep': '/interview-coaching-service',
    '/blog': '/newsroom',
    '/about-us': '/about',
    '/contact-us': '/contact',
  }

  const redirectPath = redirectMap[url.pathname.toLowerCase()]
  if (redirectPath) {
    url.pathname = redirectPath
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (Payload admin)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}
