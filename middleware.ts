import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicRoutes = ['/', '/login', '/register'];
const onboardingRoutes = ['/onboarding'];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // Bungkus dengan try-catch agar jika dekripsi token gagal di Edge Runtime, aplikasi tidak langsung crash 500
  let token = null;
  try {
    token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });
  } catch (error) {
    console.error('Middleware JWT Error:', error);
  }

  const isLoggedIn = !!token;

  // PERBAIKAN DI SINI: Deteksi rute publik secara presisi
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') return pathname === '/'; // Harus pas '/' untuk halaman utama
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  const isOnboardingRoute = onboardingRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // 1. User BELUM login dan mencoba mengakses halaman privat
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // 2. User SUDAH login dan mencoba membuka halaman login/register lagi
  if (
    isLoggedIn &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/onboarding', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Melindungi seluruh halaman kecuali aset statis dan API internal Next.js
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
