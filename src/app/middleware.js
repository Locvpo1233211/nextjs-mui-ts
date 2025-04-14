import { NextResponse } from "next/server";

export function middleware(request) {
    const url = request.nextUrl.pathname;
    if (url.startsWith("/audio/") && url.endsWith(".mp3")) {
        const filePath = url.replace("/audio/", "");
        const response = NextResponse.next();
        response.headers.set("Content-Type", "audio/mpeg");
        response.headers.set("Content-Disposition", "inline");
        return response;
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/audio/:path*",
};
