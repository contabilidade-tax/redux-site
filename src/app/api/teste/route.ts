import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export function GET(
    req: NextRequest,
) {
    const token = req.headers.get('Authorization')?.split(' ')[1]

    if (token !== process.env.NEXT_BEARER_TOKEN) {
        return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
    }
    return NextResponse.json(
        {
            cookies: cookies().getAll()
        },
        { status: 200 }
    )
}