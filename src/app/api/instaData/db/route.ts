import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]

  if (token !== process.env.NEXT_PUBLIC_BEARER_TOKEN) {
    return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
  }

  const prisma = new PrismaClient()
  const messages_array = []

  async function getInstaPostsData() {
    const data = await prisma.instaPostsData.findUnique({
      where: { id: 1 },
      include: { data: true }
    });

    return data ? data.data.slice(0, 25) : [];
  }

  async function sendMessage(message: string) {
    const response = await axios.post(
      `https://woz.herokuapp.com/webhook/control/report/send-message?group=REPORT`,
      { text: `\n*REDUX_SITE*: ${message}` },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data.Success;
  }


  try {
    const dbData = await getInstaPostsData()

    const message = "InstaPosts sem cache, verifique se o token está correto. Os posts exibidos estão guardados em banco e possivelmente, desatualizados.";
    const messageSent = await sendMessage(message);

    messages_array.push(messageSent);
    messages_array.push(message);

    return NextResponse.json(
      {
        message: "Sucesso na requisição dos dados",
        details: messages_array,
        data: dbData
      },
      { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error, message: error.message })
  }

}