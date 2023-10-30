import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('jwt');
  
  const currentPath = request.nextUrl.pathname;

  if (currentPath === '/dashboard' && cookie === undefined) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (currentPath === '/dashboard/add-event' && cookie === undefined) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (currentPath === '/dashboard/events' && cookie === undefined) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (currentPath === '/dashboard/profile' && cookie === undefined) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  
  return NextResponse.next()
}