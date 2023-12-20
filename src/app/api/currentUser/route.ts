import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const prisma = new PrismaClient()

  try {
    const currentUser = await prisma.$transaction(async (trx) => {
     return await trx.currentUser.findUnique({ where: { id: 1 } })
    })

    return NextResponse.json({ username:currentUser?.username }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: 'Error fetching data', message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}