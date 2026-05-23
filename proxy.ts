// import { NextRequest, NextResponse } from 'next/server';

// export async function proxy(req: NextRequest) {
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
// };
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicRoutes = ['/', '/login', '/register'];
const onboardingRoutes = ['/onboarding'];

export default async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  console.log('akses proxy');

  // Cek apakah berjalan di production (HTTPS)
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieName = isProduction
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

  let token = null;
  console.log('cookiename', cookieName);
  try {
    token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: isProduction,
      cookieName: cookieName, // Paksa baca cookie yang sesuai lingkungan
    });
  } catch (error) {
    // Jangan disembunyikan, cetak di log Vercel untuk memantau jika ada error internal
    console.error('Middleware JWT Error secara detail:', error);
  }
  console.log('token prody', token);
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
    console.log('belum login', token);
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // 2. User SUDAH login dan mencoba membuka halaman login/register lagi
  if (
    isLoggedIn &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'))
  ) {
    console.log('user sudah login mencoba akses login atau register', token);
    return NextResponse.redirect(new URL('/onboarding', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Melindungi seluruh halaman kecuali aset statis dan API internal Next.js
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// const publicRoutes = ['/', '/login', '/register'];
// const onboardingRoutes = ['/onboarding'];

// export default async function proxy(req: NextRequest) {
//   const { nextUrl } = req;
//   const pathname = nextUrl.pathname;
//   console.log('akses proxy');

//   // 1. Deteksi nama cookie secara dinamis berdasarkan apa yang ada di browser
//   const isProduction = process.env.NODE_ENV === 'production';

//   // Karena cookie Anda bernama __Secure-authjs.session-token di Vercel
//   const cookieName = isProduction
//     ? '__Secure-authjs.session-token'
//     : 'authjs.session-token';

//   let token = null;
//   console.log('cek auth secret', process.env.AUTH_SECRET);

//   try {
//     token = await getToken({
//       req,
//       secret: process.env.AUTH_SECRET,
//       // Masukkan konfigurasi cookie secara eksplisit di sini 👇
//       secureCookie: isProduction,
//       cookieName: cookieName,
//     });
//   } catch (error) {
//     console.error('Middleware JWT Error secara detail:', error);
//   }

//   console.log('token prody', token);
//   const isLoggedIn = !!token;

//   // Deteksi rute publik secara presisi
//   const isPublicRoute = publicRoutes.some((route) => {
//     if (route === '/') return pathname === '/';
//     return pathname === route || pathname.startsWith(`${route}/`);
//   });

//   // 2. Jika user BELUM login dan mencoba mengakses halaman privat
//   if (!isLoggedIn && !isPublicRoute) {
//     console.log('belum login, redirect ke login');
//     return NextResponse.redirect(new URL('/login', nextUrl));
//   }

//   // 3. Jika user SUDAH login dan mencoba membuka halaman login/register lagi
//   if (
//     isLoggedIn &&
//     (pathname.startsWith('/login') || pathname.startsWith('/register'))
//   ) {
//     console.log('user sudah login, redirect ke onboarding');
//     return NextResponse.redirect(new URL('/onboarding', nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
// };
