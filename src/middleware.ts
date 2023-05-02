import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log(req.url)
    // switch (req.url) {
    //     case '/login':
    //         if (localStorage.getItem('nuber_token')) {
    //             return NextResponse.redirect(new URL('/', req.url))
    //         }
    // }
}

export const config = {
    matcher: '/'
}