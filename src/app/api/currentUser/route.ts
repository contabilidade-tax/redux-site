import { PrismaClient } from 'prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
  const prisma = new PrismaClient()

  try {
    const currentUser = await prisma.currentUser.findUnique({ where: { id: 1 } })
    const { id, ...user } = currentUser!;

    return NextResponse.json(user, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: 'Error fetching data', message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}