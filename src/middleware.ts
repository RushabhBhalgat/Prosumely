import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Allow internal proxy requests to pass through
  if (request.headers.get('User-Agent')?.includes('Internal-File-Proxy')) {
    return NextResponse.next()
  }

  // Block direct access to Payload's built-in media file routes for public users
  if (url.pathname.match(/^\/(payload|admin)\/api\/media\/file\//)) {
    return new NextResponse('Forbidden: Use /api/media/file/ instead', {
      status: 403,
    })
  }

  // Create response object to add headers to
  const response = NextResponse.next()

  // Enhanced Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://generativelanguage.googleapis.com https://www.google-analytics.com https://cdn.jsdelivr.net",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')

  response.headers.set('Content-Security-Policy', csp)

  // Permissions Policy
  const permissionsPolicy = [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', ')

  response.headers.set('Permissions-Policy', permissionsPolicy)

  // Strict Transport Security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    )
  }

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

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Include payload/admin API routes for media protection
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
