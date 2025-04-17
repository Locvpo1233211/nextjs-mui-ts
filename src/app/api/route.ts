import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    // Cách 1: Sử dụng new URL để parse query parameter
    const url = new URL(request.url);
    const audio = url.searchParams.get("audio");

    console.log("audio (URL):", audio);
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/${audio}`);
}
