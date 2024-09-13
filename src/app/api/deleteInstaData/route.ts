import { NextRequest, NextResponse } from 'next/server';
import { clearCache, getDateTime } from '@/common/middleware/redisConfig';

export async function GET(req: NextRequest) {
    try {
        const customKey = req.nextUrl.searchParams.get('key') || `last_insta_posts-${getDateTime()}`; // Define um valor padrão se customKey não for fornecido
        await clearCache(customKey); // Limpa o cache para a chave especificada

        return NextResponse.json({ message: `Cache limpo para a chave: ${customKey}` }, { status: 202 }); // Retorna uma mensagem com a chave especificada
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 }); // Retorna detalhes do erro
    }
};