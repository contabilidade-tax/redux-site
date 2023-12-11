// 'use client'
import { NextRequest, NextResponse, } from 'next/server';
import sendgrid from '@sendgrid/mail';

export async function POST(req: NextRequest) {
  try {
    const messages_array: Array<string> = []
    const data = await req.json()
    const client = sendgrid;

    // Verifica se o objeto 'data' está vazio
    if (Object.keys(data).length === 0 || !data) {
      throw Error("O corpo da requisição não pode ser vazio")
    }

    // return NextResponse.json({ olaKey: data ?? 'oi' })

    client.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);
    const options = {
      personalizations: [
        {
          to: [
            {
              email: 'rh@contabilidade-tax.com.br',
              name: 'Setor de RH'
            },
          ]
        }
      ],
      from: { email: 'programacao@contabilidade-tax.com.br', name: 'Setor de Programação' },
      replyTo: { email: 'rh@contabilidade-tax.com.br', name: 'Setor de RH' },
      subject: 'Novo currículo recebido',
      html: data.body,
      attachments: [
        {
          content: 'PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==',
          filename: 'index.html',
          type: 'text/html',
          disposition: 'attachment'
        }
      ]
    }

    try {
      const emailResponse = await client.send(options)
      return NextResponse.json({ response: emailResponse, message: "Email enviado para o rh" }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
};