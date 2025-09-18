import { NextRequest, NextResponse } from 'next/server'

// const PUBLIC_PAGES = ['/login', '/register', '/images', '/favicon.ico']

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Skip Next.js internal & API routes
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  /**
   * Step 1: Handle locale
   */
  const localeMatch = pathname.match(/^\/(ar|en)(?:\/|$)/)
  const locale = localeMatch ? localeMatch[1] : null

  if (!locale) {
    // Redirect to default locale
    const defaultLocale = 'ar'
    const newUrl = new URL(`/${defaultLocale}${pathname}`, req.url)
    newUrl.search = search
    return NextResponse.redirect(newUrl)
  }

  /**
   * Step 3: Auth (optional)
   */
  // const session = await auth();
  // const isPublicPage = PUBLIC_PAGES.some((page) => pathname.includes(page));
  // if (!session?.user && !isPublicPage) {
  //   return NextResponse.redirect(new URL(`/${locale}/${version}/login`, req.url));
  // }
  // if (session?.user && isPublicPage) {
  //   return NextResponse.redirect(new URL(`/${locale}/${version}/home`, req.url));
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)']
}
