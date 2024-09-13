import { NextRequest, NextResponse, } from 'next/server';
import sendgrid from '@sendgrid/mail';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const client = sendgrid;
    const token = req.headers.get('Authorization')?.split(' ')[1]

    if (token !== process.env.NEXT_PUBLIC_BEARER_TOKEN) {
      return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
    }

    // Verifica se o objeto 'data' está vazio
    if (Object.keys(data).length === 0 || !data) {
      throw Error("O corpo da requisição não pode ser vazio")
    }

    client.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);
    const options = {
      personalizations: [
        {
          from: { email: 'programacao@contabilidade-tax.com.br', name: 'Setor de Programação' },
          to: [
            {
              email: 'rh@contabilidade-tax.com.br',
              name: 'Setor de RH'
            },
          ]
        }
      ],
      from: { email: 'programacao@contabilidade-tax.com.br', name: 'Setor de Programação' },
      replyTo: { email: 'protocolo@contabilidade-tax.com.br', name: 'Protocolos' },
      subject: 'Novo currículo recebido',
      html: data.body,
      attachments: [
        {
          content: data.arquivo.file,
          filename: data.arquivo.name,
          type: data.arquivo.type,
          disposition: 'attachment'
        }
      ]
    }

    try {
      const emailResponse = await client.send(options)
      return NextResponse.json({ response: emailResponse, message: "Email enviado para o rh" }, { status: 200 });

    } catch (error: any) {
      return NextResponse.json({ error: 'Internal Server Error', message: error.message + `SENDGRID` }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error', message: error.message, details: error }, { status: 500 });
  }
};