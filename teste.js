// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const currentUser = await prisma.currentUser.findUnique({ where: { id: 1 } });
  console.log(currentUser);
}

main().then()