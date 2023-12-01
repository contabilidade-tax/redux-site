/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const posts = prisma.instaPostsData.findMany()

function getDateCoisas(date) {
  const ano = date.getFullYear();
  const mes = date.getMonth() + 1; // (0-11, onde 0 é janeiro e 11 é dezembro)
  const dia = date.getDate();
  const hora = date.getHours();
  const minuto = date.getMinutes();
  const segundo = date.getSeconds();

  return { ano, mes, dia, hora, minuto, segundo };
}

// eslint-disable-next-line no-return-assign
// posts.then((data) => {
//   const obj = JSON.parse(JSON.stringify(data.at(0)))
//   const time = Date.parse(obj.generated_at)
//   const date = new Date(time)
//   const datee = getDateCoisas(date)
//   const teste = getDateCoisas(new Date(5182660))
//   const teste2 = getDateCoisas(new Date(1696008201887))

//   console.log(date.getTime(), '', time)
//   console.log(datee)
//   console.log(teste)
//   console.log(teste2)
// })

const data = {
  "data": [
    {
      "id": "18005011234875218",
      "caption": "🎉 Feliz dia do Contador a todos os nossos colaboradores! 🎉\n\nHoje é um dia especial para celebrar a profissão que é um pilar crucial na nossa empresa: A Contabilidade. Mas os parabéns se estendem a todos que fazem parte do nosso extraordinário time.\n\nAos nossos contadores, sua dedicação, ética e experiência são elementos indispensáveis que contribuem diariamente para nosso sucesso.\n\nAo nosso dedicado setor financeiro, você é o guardião dos nossos recursos e desempenha um papel essencial na nossa trajetória.\n\nAos nossos talentosos programadores, profissionais de marketing e todos os outros setores, sua habilidade e criatividade são vitais para fazer nossa empresa brilhar.\n\nJuntos, somos mais fortes, mais eficientes e infinitamente mais bem-sucedidos. Que continuemos a elevar o nome da nossa empresa a novos patamares.\n\nFeliz dia do contador e um grandioso agradecimento a toda a equipe! 🎊🙌\n\n#contador #diadocontador #contabil #equipe #sucesso",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/380223833_842847900605055_4483800686139271861_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=6wzYM4z7RcUAX8xHRdP&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCvQyHD2LqpBHXyl7VkPHcoJmgH0YbUG8Kd89yupJmNkw&oe=6521CF57",
      "permalink": "https://www.instagram.com/p/Cxf191vuDuq/",
      "timestamp": "2023-09-22T14:31:49+0000"
    },
    {
      "id": "18022219954674157",
      "caption": "📊 Contabilidade 5.0 na UFCA: Um Marcante Momento de Aprendizado 🤖 \n\n  No nosso último encontro, tivemos a oportunidade de mergulhar profundamente na interseção entre Contabilidade e Inteligência Artificial. Foi uma palestra incrível que abriu nossos olhos para as infinitas possibilidades que a tecnologia oferece ao setor contábil. \nSe você perdeu, fique atento aos nossos próximos eventos! O futuro da contabilidade já começou e você não vai querer ficar para trás. \n\n#Contabilidade5.0 #UFCA #InteligênciaArtificial #contabilidade #contabil",
      "media_type": "CAROUSEL_ALBUM",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/382241774_842263870663458_7594259918366757753_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=YBiY0YgO7s8AX_9zeFx&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA9VYvIz7rwTDyno_tsz05GjobrXL46HmfiwQpaHgTlNw&oe=652074AB",
      "permalink": "https://www.instagram.com/p/CxdJTDws_nk/",
      "timestamp": "2023-09-21T13:23:00+0000"
    },
    {
      "id": "18125577529308590",
      "caption": "Desejamos a você @alinebelarmino_  todas as maravilhas que o mundo pode oferecer.\n\nFeliz aniversário! 🥳\n\n#felizaniversario",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/376238606_836035421286303_2855966063998561786_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=MdCLb9jTOE8AX9SJfr7&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBbHN6_N4JmiU3B_9dLcGxhcZHuZmh8j2LTBXL4Dr4UmQ&oe=6521FD0B",
      "permalink": "https://www.instagram.com/p/CxQH1satQYN/",
      "timestamp": "2023-09-16T12:00:08+0000"
    },
    {
      "id": "18023575951655795",
      "caption": "Que a intercessão da Mãe das Dores nos ajude a enfrentar as adversidades da vida com fé e esperança, lembrando-nos de que, mesmo nos momentos mais difíceis, não estamos sozinhos. \n\nQue sua luz guie e conforte todos os corações.🙏🕊️",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/376255807_836025231287322_5057896119669673342_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=a5rKH7yZ45cAX94xysh&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAE_HDny3dB8ducrkKL1H-0T6v8bydNro8FnsHAFIQBrA&oe=65206653",
      "permalink": "https://www.instagram.com/p/CxNjCWayQWq/",
      "timestamp": "2023-09-15T12:00:05+0000"
    },
    {
      "id": "18014438644828951",
      "caption": "Celebremos a independência do nosso país com orgulho e gratidão. Que estes dados nos inspirem a construir um futuro cada vez mais próspero e justo para todos.\n\nViva a nossa pátria!\n\n#7deSetembro #IndependênciaDoBrasil",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/374635431_832292418327270_6462097481627950874_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=1MlOggWWKukAX-YJIqr&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBDdl2XKBxvtF5N1iuEWoUcfbA5UpKyMGwkxw2Rcl06Aw&oe=6521A429",
      "permalink": "https://www.instagram.com/p/Cw48r4pNKWw/",
      "timestamp": "2023-09-07T12:00:09+0000"
    },
    {
      "id": "18289410277133036",
      "caption": "Parabéns pelo seu dia @richardsouza.st ! Agradecemos por fazer parte da nossa equipe e desejamos um ano repleto de conquistas e alegrias. Feliz aniversário!🎉🎂",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/374565958_832289441660901_5343854616313893954_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=qqd3ED4-Z2IAX9-_YMj&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfC1e7ovMnR3_qsiae8NBDn1VIJQPJ-3whAu_plnGMK7Sw&oe=652146E3",
      "permalink": "https://www.instagram.com/p/Cw2ewgYgEe4/",
      "timestamp": "2023-09-06T13:00:09+0000"
    },
    {
      "id": "18001270730066402",
      "caption": "Às vezes, administrar as finanças pode parecer como mirar em um alvo distante. Mas não se preocupe, estamos aqui para ajudar a acertar em cheio! 📊💰\n\nAqui estão algumas dicas valiosas para se tornar um arqueiro financeiro de sucesso:\n\nDiagnóstico Financeiro: Analise suas finanças com precisão. Identifique pontos fortes e oportunidades de melhoria.\n\nDefina Metas Claras: Como um arqueiro focado, estabelece metas financeiras realistas e alcançáveis.\n\nControle Financeiro: Mantenha um registro rigoroso de receitas e despesas. O controle é a chave para evitar desvios.\n\nMonitoramento Constante: Acompanhe seus resultados regularmente, ajustando sua trajetória conforme necessário.\n\nPlanejamento Estratégico: Assim como um arqueiro planeja cada tiro, desenvolva um plano financeiro estratégico.\n\nEstá pronto para acertar o centro do alvo das finanças? 🏹💼 Com nossas dicas, você estará no caminho certo para o sucesso financeiro!\n\n#gaviaoarqueiro #alvo #contabilidade #cariri #juazeirodonorte #tax",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/368272229_823740932515752_1126522466293987707_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=4UaO6Y2RzssAX-hjiUs&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfD7WdNii05R82_fgJJ6tQP_8_pbxVlXA1f8sfyWvueEjw&oe=652172EE",
      "permalink": "https://www.instagram.com/p/CwYcJJXApuO/",
      "timestamp": "2023-08-25T21:00:05+0000"
    },
    {
      "id": "18010629250853254",
      "caption": "Quem precisa de um mapa do tesouro quando tem um contador?\n\nX marca o sucesso! 🗺️💼 Assim como Jack Sparrow confia em sua bússola, sua empresa confia no contador para navegar pelas águas financeiras. O contador é o verdadeiro capitão do seu navio, mantendo suas finanças no rumo certo.\n\nDesde equilibrar os números até encontrar oportunidades escondidas, o contador é como o primeiro oficial do Pérola Negra.\n\nSempre pronto para enfrentar os desafios. E não se preocupe, eles não têm olho no seu ouro, apenas olham pelos seus lucros!\n\nEntão, se você está procurando um tesouro duradouro, saiba que o contador é o verdadeiro guia que o levará a um sucesso digno de lendas. ⚓📊\n\n#contabilidade #contabil #piratasdocaribe #jacksperrow #cariri #juazeiro",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/367464793_823725465850632_7495062397844164345_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=AHOT7b-w-n8AX-AQxP0&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAQp5DOFh47jAnUEeRtziEP_zR8PnpQPFK1IiYBFeznhg&oe=6522310C",
      "permalink": "https://www.instagram.com/p/CwTSjojN6TM/",
      "timestamp": "2023-08-23T21:00:07+0000"
    },
    {
      "id": "17982709505164736",
      "caption": "Não precisa ser um bruxo para dominar os números. Aqui estão algumas dicas para suas estratégias financeiras se tornarem tão mágicas quanto as poções de Hogwarts:\n\nPlanos Sólidos: Assim como um feitiço bem planejado, crie um plano financeiro sólido para cada fase do seu negócio.\n\nOrçamento Mágico: Um orçamento bem construído é como um feitiço de proteção para suas finanças. Mantenha-se dentro dos limites!\n\nFeitiço de Investimento: Aplique em áreas que impulsionarão o crescimento, como investir em treinamento de equipe ou marketing.\n\nMonitoramento Constante: Assim como um Guardião da Floresta Proibida, mantenha-se vigilante sobre seus números e faça ajustes quando necessário.\n\nEconomize como um Duende: Poupe uma porção dos seus lucros como os duendes do Gringotes. Ter reservas é como um feitiço de segurança.\n\nLembre-se, a mágica das estratégias financeiras está em manter a disciplina e o foco. Sempre à sua disposição para transformar seus números em magia real! 🔢✨\n\n#harrypotter #sonserina #contabilidade #potter",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/368046365_823711759185336_6310026972469442206_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=4XHZzA1NU_sAX96Wli9&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfD9SauysdtosHh-xDgSRW-aM76V4DLUNOEDly401fOpnw&oe=65206852",
      "permalink": "https://www.instagram.com/p/CwOI94jIyYf/",
      "timestamp": "2023-08-21T21:00:07+0000"
    },
    {
      "id": "18309417106096345",
      "caption": "🚀 Do Zero ao Milhão: Estratégias para Fazer Sua Empresa Crescer\n\n1️⃣ Planejamento Sólido: Estabeleça metas claras e tangíveis.\n\n2️⃣ Conheça Seu Público: Saiba exatamente quem são seus clientes.\n\n3️⃣ Marketing Eficiente: Aposte em estratégias que impactem.\n\n4️⃣ Inovação Contínua: Esteja sempre atualizado e aberto a novidades.\n\n5️⃣ Gestão Eficiente: Organize processos para maximizar eficiência.\n\n6️⃣ Excelência no Atendimento: Surpreenda e fidelize seus clientes.\n\n7️⃣ Parcerias Estratégicas: Colabore para alcançar novos horizontes.\n\nCom essas táticas, sua empresa estará pronta para voar rumo ao sucesso!🚀💼\n\n#estratégias #crescimento #dozeroaomilhão #sucesso #tax #contabilidade",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/365953602_817330143156831_4849469593598653611_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=x2t4GH8SwzAAX-GH3VW&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB2kaDES6xr6boI6v8riA2T_yGzEx5YbqDmFzaf053xBA&oe=6521F637",
      "permalink": "https://www.instagram.com/p/CwGakpLsmMp/",
      "timestamp": "2023-08-18T21:00:02+0000"
    },
    {
      "id": "17846179317043850",
      "caption": "A contabilidade é nossa passarela e nossos contadores são verdadeiras estrelas! 🌟💼\n\nCom desempenho dignos do tapete vermelho, eles transformam números em histórias de sucesso.\n\nNossa equipe brilha nas melhores práticas, e o troféu vai para aqueles que transformam balanços em verdadeiros blockbusters financeiros! 🎬🔍\n\n#oscar #sucesso #tax #contabilidade",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/365262700_817329626490216_8555318262985024492_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=j-MCbD-nKgMAX8zDMiP&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDnkP9xKTcS0TylA6mqU0okT7a5RpvLK4Pvb8Kq6mBYFA&oe=6520D53F",
      "permalink": "https://www.instagram.com/p/CwBQ_hPJ2Bo/",
      "timestamp": "2023-08-16T21:00:07+0000"
    },
    {
      "id": "18356095585075220",
      "caption": "✈️ Quer ver sua empresa voar alto? Siga esses passos:\n\n1️⃣ Plano de Voo: Trace metas claras e objetivas.\n\n2️⃣ Tripulação Unida: Tenha uma equipe comprometida.\n\n3️⃣ Combustível Financeiro: Mantenha um fluxo de caixa saudável.\n\n4️⃣ Estratégia de Navegação: Esteja atento ao mercado.\n\n5️⃣ Check-in Regular: Avalie e ajuste seu plano.\n\nCom esses elementos, sua empresa decolará e alcançará novos horizontes!✈️\n\n#empreendedorismo #sucesso #contabilidade #tax",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/366003102_817328703156975_7911170271120979538_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=wOfMrvqGpekAX8Xy3N7&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfD1fFxgexcTPkeZDBo6ebJ2MD-COq8oHIOvL41Crv_n5A&oe=6522288C",
      "permalink": "https://www.instagram.com/p/Cv8HaDEIv5Q/",
      "timestamp": "2023-08-14T21:00:10+0000"
    },
    {
      "id": "17993536013129244",
      "caption": "Neste Dia dos Pais, queremos homenagear três homens incríveis, que provaram que a paternidade não conhece limites. @clodomiro.neto  @isaacfp21 e @thalestax, vocês são exemplos de amor incondicional, que se estendem além dos laços de sangue e alcançam a mais profunda conexão de alma e coração.\n\nFeliz dia dos Pais! \n\n#pai #felizdiadospais #pais",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/366025342_816050706618108_4966244619089503334_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=uHHi4-GfYUUAX8buCM5&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfADctJHi3WJEPE1YbrLugY18DpWkarBWHkpgGuzWQycAA&oe=65217B7E",
      "permalink": "https://www.instagram.com/p/Cv4rrVrvD1P/",
      "timestamp": "2023-08-13T13:00:08+0000"
    },
    {
      "id": "18235367836209368",
      "caption": "Assim como um semáforo guia o trânsito, indicadores financeiros nos orientam.\n\nObservar margens de lucro, fluxo de caixa e endividamento ajuda a antecipar problemas. Se as margens caem ou o fluxo de caixa aperta, ação é necessária! Além disso, a rentabilidade de produtos aponta áreas que precisam de ajustes.\n\nAgir rápido com base nessas informações mantém sua empresa nos trilhos do crescimento. 📊💰\n\n#sucesso #contabilidade #tax",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/365905332_817327619823750_9023433459823366430_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=avJWKkKXSscAX-rgfeU&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCkds_HHi8zn3y56AkfD4EKAuk315VLmmTsd2C1KVh2Bg&oe=6520C1B1",
      "permalink": "https://www.instagram.com/p/Cvx0OPqomXt/",
      "timestamp": "2023-08-10T21:00:07+0000"
    },
    {
      "id": "17996346746010088",
      "caption": "🎉🎂 Parabéns, @psd.alisson ! 🥳 Que sua criatividade seja tão infinita quanto o feed do Instagram🎉✨ \n#FelizAniversário #marketing",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/364130825_811118707111308_3526537936770093552_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=R3QFfdvnKxIAX86ERqV&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDu5ufBFnc1JqCDpxeNNrJYf72r_x5Cf4sldbJB2_5ulg&oe=6520A8A3",
      "permalink": "https://www.instagram.com/p/CvXHC69taS2/",
      "timestamp": "2023-07-31T12:05:06+0000"
    },
    {
      "id": "18020740819617686",
      "caption": "O Cafezeiro e a fidelidade! ☕️\n#cafe #empreendedorismo",
      "media_type": "VIDEO",
      "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/DF4959CDD41E0B6C4E1141C486130698_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&vs=1259980797987538_1710677309&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9ERjQ5NTlDREQ0MUUwQjZDNEUxMTQxQzQ4NjEzMDY5OF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR09KNHFoVVFGWWQ1cFI4Q0FQZXdiRWNEenF0MGJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAmsIu6%2F9329T8VAigCQzMsF0BQFCj1wo9cGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfAmnP5liOwkAY278zCT0Vk-1KxgSOSA0hpgJ5TBNl2A-w&oe=651E3085&_nc_sid=1d576d&_nc_rid=94c97ce817",
      "permalink": "https://www.instagram.com/reel/CvM6KxYOwlm/",
      "timestamp": "2023-07-27T13:00:00+0000"
    },
    {
      "id": "18273482995148507",
      "caption": "Pega essa sequência de cliques do treinamento que está acontecendo essa semana! 🔥",
      "media_type": "CAROUSEL_ALBUM",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/362254657_808500750706437_5598167955140200337_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=CG_5WIhnxfwAX_OemTE&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCkPZeGE964faZ04xive7ZnBpTtBuZTYjvfjUC5zSsiUQ&oe=65211739",
      "permalink": "https://www.instagram.com/p/CvK0V3vO9TF/",
      "timestamp": "2023-07-26T17:30:46+0000"
    },
    {
      "id": "17905663307805260",
      "caption": "Muito mais que números, muito mais que uma simples empresa contábil! 🔥🎯\n\n#taxcontabilidade #contabilidade",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/358729763_713048600588059_2540263878223084682_n.png?stp=dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=nrvYJ_vEctkAX_g-nvk&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBACGb5SWp3EM_NVmWMWYbizwEcGrO5Jj0Y_s7BtNTgRQ&oe=65210829",
      "permalink": "https://www.instagram.com/p/CvGCtHYrk55/",
      "timestamp": "2023-07-24T21:00:05+0000"
    },
    {
      "id": "18303910006097977",
      "caption": "Treinamento Contábil🔥🎯\n\n#treinamento #contabilidade",
      "media_type": "VIDEO",
      "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/E6425F2BBE3844CBD7901DDC78F37691_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&vs=807034461147938_2291861960&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9FNjQyNUYyQkJFMzg0NENCRDc5MDFEREM3OEYzNzY5MV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0xIN3B4V2F0OVN6LVZzQ0FOSzhmTVJJQlZrYWJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAm%2BMix%2BavQ9j8VAigCQzMsF0BPlYEGJN0vGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfB4qFAg52DUSe5-zjdu86zlH7bgLKoyaQ4seGsRVBl0kQ&oe=651E191B&_nc_sid=1d576d&_nc_rid=1182db3942",
      "permalink": "https://www.instagram.com/reel/CvFEg2LNpc5/",
      "timestamp": "2023-07-24T11:57:26+0000"
    },
    {
      "id": "18217544668216889",
      "caption": "Redução de taxas do pronampe!🔥\n\n#pronampe #contabilidade",
      "media_type": "VIDEO",
      "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/C640BB00718C62BB06AAD415CDDF0199_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&vs=968171097752907_825495435&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9DNjQwQkIwMDcxOEM2MkJCMDZBQUQ0MTVDRERGMDE5OV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0Z4dWNSWGdUYVNsY3ZRQUFHbzZtSnJBZ09sWWJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAm4t%2FDjtiL%2Bj8VAigCQzMsF0BAk3S8an76GBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfBrZDdczkuyXLQFFCuMJvDeTI0Zs3CWdz_xeE2D2pDtkQ&oe=651E0227&_nc_sid=1d576d&_nc_rid=236e582f1d",
      "permalink": "https://www.instagram.com/reel/Cu-UcmTJwXR/",
      "timestamp": "2023-07-21T21:01:25+0000"
    },
    {
      "id": "18257048125083981",
      "caption": "Descubra a Força da Contabilidade: A Energia que Impulsiona o Sucesso Empresarial!\n\nAssim como Oppenheimer e sua equipe trabalharam juntos no Projeto Manhattan para desenvolver uma tecnologia poderosa, a contabilidade desempenha um papel crucial na construção de bases sólidas para o seu negócio.\n\nDeixe- nos guiar seus esforços financeiros, equilibrando os números e liberando a energia necessária para sustentar o crescimento e alcançar resultados extraordinários.\n\nA contabilidade é a chave para a explosão do sucesso empresarial! 💼💥\n\n#oppenheimer #contabilidade ##empresário",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/361205504_803267417896437_6517468117590327147_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=lTCR0CNHz-wAX-9Z6_2&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCHFucideWYwsF_HafmXzbfGa-t3cx2RV4cPG1AXMgtzA&oe=65219A67",
      "permalink": "https://www.instagram.com/p/Cu9rICCITm-/",
      "timestamp": "2023-07-21T15:00:07+0000"
    },
    {
      "id": "18024847339580400",
      "caption": "Lei 14.611- Discriminação Salarial💰\n\n#clt #contabilidade",
      "media_type": "VIDEO",
      "media_url": "https://scontent.cdninstagram.com/o1/v/t16/f1/m82/FE42BB8DEAA1BFC12E0844569EF22FAE_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&vs=239149158958444_4274239582&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9GRTQyQkI4REVBQTFCRkMxMkUwODQ0NTY5RUYyMkZBRV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0pVdGtSVmxTeUxSU3BBV0FJTlhsT1haRXRFcWJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAmvI%2B2oLv1hkAVAigCQzMsF0BPkrAgxJumGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfCf9AIqj8Vzx9xgdXoIe7-T8RPZ6FtdIF1UFAwEiRN9lg&oe=651DF734&_nc_sid=1d576d&_nc_rid=804ac19f4b",
      "permalink": "https://www.instagram.com/reel/Cu64rH2tSb3/",
      "timestamp": "2023-07-20T13:01:10+0000"
    },
    {
      "id": "17990105708136225",
      "caption": "Assim como a Barbie encontrou sua jornada para a felicidade no mundo humano, você pode encontrar o sucesso empresarial com a ajuda da contabilidade adequada. Deixe-nos cuidar dos detalhes financeiros e permitir que sua empresa brilhe, independentemente da aparência. A verdadeira felicidade empresarial começa quando você encontra uma parceria certa. 💼✨\n\n#barbie #barbiegirl #contabilidade #empresário #rosa",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/359331498_801778128045366_7490064605163822842_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=YVzWXYAAIwkAX-iUqzK&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCS0f4t5v8z755XuIYDzKZrWBol3S-ANuD2b0RNmdYxtw&oe=652121B1",
      "permalink": "https://www.instagram.com/p/Cu4hiS8Okfm/",
      "timestamp": "2023-07-19T15:00:07+0000"
    },
    {
      "id": "17872622033891967",
      "caption": "🚀📊 Prepare-se para a Invasão Contábil mais surpreendente do universo empresarial! Os Skrulls podem até dominar a transformação física, mas nós dominamos os números! 💼💥\n\nNesta batalha pelo equilíbrio financeiro, não há espaço para erros. Com precisão e criatividade, nossos contadores estão prontos para desvendar cada segredo nas planilhas e garantir a vitória para o seu negócio. 🕵️‍♂️💰\n\nQuando se trata de lidar com números, confie em especialistas que estão um passo à frente. Junte-se à resistência e proteja sua empresa dos desafios financeiros. A invasão começou e juntos vamos triunfar! 💪📚\n\n#InvasãoContábil #Skrulls #ProtegendoSeusNúmeros #invasãosecreta #marvel",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/360088189_801756924714153_3070195166107638989_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=d6aNanii8y4AX-ct9Em&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDEP7XFBBbX_O7e0SxwcGTMURnEwbOR4FRGmGjNTAGKSA&oe=652229C0",
      "permalink": "https://www.instagram.com/p/CuzX8TGNJmb/",
      "timestamp": "2023-07-17T15:00:05+0000"
    },
    {
      "id": "18022886533590466",
      "caption": "🌟 Chame atenção, prenda olhares e venda com criatividade! Sua Ideia Empresarial no Palco é a atração imperdível que vai conquistar o público da ExpoCrato. Prepare-se para um show que vai inspirar, encantar e sustentar seus negócios! 💼✨\n\nAgora que chamei sua atenção para esse falso post. Ser criativo e chamar a atenção são aspectos fundamentais para o sucesso do seu negócio. Atrair a atenção do público é o primeiro passo para conquistar clientes e suas vendas.\n\n#Expocrato #ShowDeIdeias #criatividadeemação",
      "media_type": "IMAGE",
      "media_url": "https://scontent.cdninstagram.com/v/t39.30808-6/359836981_801618301394682_6482690028435336681_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=WTU3juEMGyoAX_RXSVm&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDfAJbXrXDAkosIoGSUVHqUwu-lYXyLifOmXsrtD-OjPw&oe=65222596",
      "permalink": "https://www.instagram.com/p/CurfAmAMZsq/",
      "timestamp": "2023-07-14T13:27:55+0000"
    }
  ]
}


const db_data = prisma.instaPostsData.update({
  where: {
    id: 1
  },
  data: {
    ...data.data
  }
}).then(result => console.log(result))

// const teste = ["olá"]

// teste.push("isso")
// teste.push("é")
// teste.push("um")
// teste.push("teste")

// console.log(teste)