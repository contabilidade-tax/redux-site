// import { InstaTokenData } from "@/types";
// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()
// const messages_array: Array<string> = []

// async function updateTokenDB(tokenData: Prisma.TokenDataCreateInput) {
//     return await prisma.tokenData.upsert({
//         where: {
//             id: 1
//         },
//         create: {
//             id: 1,
//             ...tokenData,
//             access_token: tokenData.access_token,
//         },
//         update: {
//             ...tokenData,
//             access_token: tokenData.access_token,
//         }
//     })
// }


// async function setAccessToken(tokenData: InstaTokenData) {
//     await Promise.all([
//         // Salva no prisma se for token
//         updateTokenDB(data),
//         // Salva no cache do prisma
//         setRedisRegister(data, customKey),
//     ]).then(([data, cache]) => {
//         tokenData = { ...data, expires_in: data.expires_in }
//         messages_array.push("Created Successfully register on db");
//         messages_array.push("Created Successfully on cache: " + cache);
//     }).catch((error: any) => {
//         console.error(error);
//     });
// }