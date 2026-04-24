import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicRoutes = ['/', '/login', '/register'];
const onboardingRoutes = ['/onboarding'];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isOnboardingRoute = onboardingRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  //user belum login dan mencoba halaman private
  if (!isLoggedIn && !isPublicRoute) {
    console.log('belum login');
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  //jika sudah login, ambil tennt dari token/session jwt
  const tokenId = token?.tenantId;
  //user sudah login tetapi belum punya tenant/ membership

  //masih perlu dibenahi bagian ini
  // if (isLoggedIn && !tokenId) {
  //   //izinkan akses ke onboarding
  //   if (!isOnboardingRoute) {
  //     console.log('redirect ke onboarding');
  //     return NextResponse.redirect(new URL('/onboarding', nextUrl));
  //   }

  //   return NextResponse.next();
  // }

  //user sudah punya tenant tetapi mencoba membuka onboarding lagi
  // if (isLoggedIn && tenantId && isOnboardingRoute) {
  //   return NextResponse.redirect(new URL('/dashboard', nextUrl));
  // }

  //user sudah login lalu membuka login/register lagi
  if (
    isLoggedIn &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
