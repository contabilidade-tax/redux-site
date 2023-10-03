import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export function GET(
    req: NextRequest,
) {
    return NextResponse.json(
        {
            cookies: cookies().getAll()
        },
        { status: 200 }
    )
}