import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import locales from 'locale-codes';

const availableLocales = ['ar', 'en'];
const defaultLocale = availableLocales[0];
const fallbackLocale = availableLocales[1];

function getLocale(request: NextRequest) {
  const headers = {
    'accept-language': request.headers.get('accept-language') || defaultLocale,
  };
  const requestedLocales = new Negotiator({
    headers,
  }).languages();

  return match(requestedLocales, availableLocales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasValidLocale = locales.getByTag(pathname.split('/')[1]) ?? false;
  const isLocalSupported = availableLocales.some((locale) => pathname.startsWith(`/${locale}`));

  if (hasValidLocale && isLocalSupported) return;

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
