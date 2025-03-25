import { NextResponse } from 'next/server'

export function middleware(request) {
  const userToken = request.cookies.get('token')?.value;

  if(!userToken) {
     return NextResponse.redirect(new URL('/login',request.url))
  }

  else {
   return NextResponse.redirect(new URL('/', request.url))
  }
}

// Supports both a single string value or an array of matchers
export const config = {
    matcher: ['/home','/user'],
  }