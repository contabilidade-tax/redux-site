import { NextRequest, NextResponse } from 'next/server'

type ResponseData = {
    message: string
}

export function GET(
    req: NextRequest,
) {
    return NextResponse.json(
        {
            "data": [
                {
                    "id": "18005011234875218",
                    "caption": "🎉 Feliz dia do Contador a todos os nossos colaboradores! 🎉\n\nHoje é um dia especial para celebrar a profissão que é um pilar crucial na nossa empresa: A Contabilidade. Mas os parabéns se estendem a todos que fazem parte do nosso extraordinário time.\n\nAos nossos contadores, sua dedicação, ética e experiência são elementos indispensáveis que contribuem diariamente para nosso sucesso.\n\nAo nosso dedicado setor financeiro, você é o guardião dos nossos recursos e desempenha um papel essencial na nossa trajetória.\n\nAos nossos talentosos programadores, profissionais de marketing e todos os outros setores, sua habilidade e criatividade são vitais para fazer nossa empresa brilhar.\n\nJuntos, somos mais fortes, mais eficientes e infinitamente mais bem-sucedidos. Que continuemos a elevar o nome da nossa empresa a novos patamares.\n\nFeliz dia do contador e um grandioso agradecimento a toda a equipe! 🎊🙌\n\n#contador #diadocontador #contabil #equipe #sucesso",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/380223833_842847900605055_4483800686139271861_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=kYBFD64g5jYAX-XW_zU&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAuiwQ_1UVuYzU2UgpTcnSJFMzdKMvwW_iCgWMxgl7zrg&oe=651BE097",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cxf191vuDuq\/",
                    "timestamp": "2023-09-22T14:31:49+0000"
                },
                {
                    "id": "18022219954674157",
                    "caption": "📊 Contabilidade 5.0 na UFCA: Um Marcante Momento de Aprendizado 🤖 \n\n  No nosso último encontro, tivemos a oportunidade de mergulhar profundamente na interseção entre Contabilidade e Inteligência Artificial. Foi uma palestra incrível que abriu nossos olhos para as infinitas possibilidades que a tecnologia oferece ao setor contábil. \nSe você perdeu, fique atento aos nossos próximos eventos! O futuro da contabilidade já começou e você não vai querer ficar para trás. \n\n#Contabilidade5.0 #UFCA #InteligênciaArtificial #contabilidade #contabil",
                    "media_type": "CAROUSEL_ALBUM",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/382241774_842263870663458_7594259918366757753_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=R2EaKH08CXAAX8ZVoBD&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCKTY4DGt1UJvK6b3LaAWT25Gz-ylt21jtnVQPb_h93kA&oe=651C802B",
                    "permalink": "https:\/\/www.instagram.com\/p\/CxdJTDws_nk\/",
                    "timestamp": "2023-09-21T13:23:00+0000"
                },
                {
                    "id": "18125577529308590",
                    "caption": "Desejamos a você @alinebelarmino_  todas as maravilhas que o mundo pode oferecer.\n\nFeliz aniversário! 🥳\n\n#felizaniversario",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/376238606_836035421286303_2855966063998561786_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=O1-VouvhVaoAX9_dZ5z&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA8ntwjxtF4NU8qSP7zB7jsd9CGjTpqUnKUBXsUDsBfMA&oe=651C0E4B",
                    "permalink": "https:\/\/www.instagram.com\/p\/CxQH1satQYN\/",
                    "timestamp": "2023-09-16T12:00:08+0000"
                },
                {
                    "id": "18023575951655795",
                    "caption": "Que a intercessão da Mãe das Dores nos ajude a enfrentar as adversidades da vida com fé e esperança, lembrando-nos de que, mesmo nos momentos mais difíceis, não estamos sozinhos. \n\nQue sua luz guie e conforte todos os corações.🙏🕊️",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/376255807_836025231287322_5057896119669673342_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=ZlD4KNvSHqoAX9Bd7gl&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCp7glimLKJA3WE7uYMKDPC6CakL75RXVT-2e6FmA5Czg&oe=651C71D3",
                    "permalink": "https:\/\/www.instagram.com\/p\/CxNjCWayQWq\/",
                    "timestamp": "2023-09-15T12:00:05+0000"
                },
                {
                    "id": "18014438644828951",
                    "caption": "Celebremos a independência do nosso país com orgulho e gratidão. Que estes dados nos inspirem a construir um futuro cada vez mais próspero e justo para todos.\n\nViva a nossa pátria!\n\n#7deSetembro #IndependênciaDoBrasil",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/374635431_832292418327270_6462097481627950874_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=347AyJl8tFgAX8g6kYP&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDsMTNPd7_A_n12PUflbUOEThX2P9C9EYIZtqQT4o3Dlw&oe=651BB569",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cw48r4pNKWw\/",
                    "timestamp": "2023-09-07T12:00:09+0000"
                },
                {
                    "id": "18289410277133036",
                    "caption": "Parabéns pelo seu dia @richardsouza.st ! Agradecemos por fazer parte da nossa equipe e desejamos um ano repleto de conquistas e alegrias. Feliz aniversário!🎉🎂",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/374565958_832289441660901_5343854616313893954_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=00-pkd0_tA0AX88nxUa&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDFns8EJUqvWevuq6GrLxTqrmwtbYOttJs75cBWNSVKIA&oe=651B5823",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cw2ewgYgEe4\/",
                    "timestamp": "2023-09-06T13:00:09+0000"
                },
                {
                    "id": "18001270730066402",
                    "caption": "Às vezes, administrar as finanças pode parecer como mirar em um alvo distante. Mas não se preocupe, estamos aqui para ajudar a acertar em cheio! 📊💰\n\nAqui estão algumas dicas valiosas para se tornar um arqueiro financeiro de sucesso:\n\nDiagnóstico Financeiro: Analise suas finanças com precisão. Identifique pontos fortes e oportunidades de melhoria.\n\nDefina Metas Claras: Como um arqueiro focado, estabelece metas financeiras realistas e alcançáveis.\n\nControle Financeiro: Mantenha um registro rigoroso de receitas e despesas. O controle é a chave para evitar desvios.\n\nMonitoramento Constante: Acompanhe seus resultados regularmente, ajustando sua trajetória conforme necessário.\n\nPlanejamento Estratégico: Assim como um arqueiro planeja cada tiro, desenvolva um plano financeiro estratégico.\n\nEstá pronto para acertar o centro do alvo das finanças? 🏹💼 Com nossas dicas, você estará no caminho certo para o sucesso financeiro!\n\n#gaviaoarqueiro #alvo #contabilidade #cariri #juazeirodonorte #tax",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/368272229_823740932515752_1126522466293987707_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=BMTwyPQ8oToAX_Hq2ao&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCWOg1doGO89YcXLfK5DBHa0lJcccYyArA55jmmaV9tLw&oe=651B842E",
                    "permalink": "https:\/\/www.instagram.com\/p\/CwYcJJXApuO\/",
                    "timestamp": "2023-08-25T21:00:05+0000"
                },
                {
                    "id": "18010629250853254",
                    "caption": "Quem precisa de um mapa do tesouro quando tem um contador?\n\nX marca o sucesso! 🗺️💼 Assim como Jack Sparrow confia em sua bússola, sua empresa confia no contador para navegar pelas águas financeiras. O contador é o verdadeiro capitão do seu navio, mantendo suas finanças no rumo certo.\n\nDesde equilibrar os números até encontrar oportunidades escondidas, o contador é como o primeiro oficial do Pérola Negra.\n\nSempre pronto para enfrentar os desafios. E não se preocupe, eles não têm olho no seu ouro, apenas olham pelos seus lucros!\n\nEntão, se você está procurando um tesouro duradouro, saiba que o contador é o verdadeiro guia que o levará a um sucesso digno de lendas. ⚓📊\n\n#contabilidade #contabil #piratasdocaribe #jacksperrow #cariri #juazeiro",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/367464793_823725465850632_7495062397844164345_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=kkoDPc93qIIAX9gY5so&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDZF-_z9v1-PSXueFnLoMa8blPeXDvLUBhM1y6zRg4y7Q&oe=651C424C",
                    "permalink": "https:\/\/www.instagram.com\/p\/CwTSjojN6TM\/",
                    "timestamp": "2023-08-23T21:00:07+0000"
                },
                {
                    "id": "17982709505164736",
                    "caption": "Não precisa ser um bruxo para dominar os números. Aqui estão algumas dicas para suas estratégias financeiras se tornarem tão mágicas quanto as poções de Hogwarts:\n\nPlanos Sólidos: Assim como um feitiço bem planejado, crie um plano financeiro sólido para cada fase do seu negócio.\n\nOrçamento Mágico: Um orçamento bem construído é como um feitiço de proteção para suas finanças. Mantenha-se dentro dos limites!\n\nFeitiço de Investimento: Aplique em áreas que impulsionarão o crescimento, como investir em treinamento de equipe ou marketing.\n\nMonitoramento Constante: Assim como um Guardião da Floresta Proibida, mantenha-se vigilante sobre seus números e faça ajustes quando necessário.\n\nEconomize como um Duende: Poupe uma porção dos seus lucros como os duendes do Gringotes. Ter reservas é como um feitiço de segurança.\n\nLembre-se, a mágica das estratégias financeiras está em manter a disciplina e o foco. Sempre à sua disposição para transformar seus números em magia real! 🔢✨\n\n#harrypotter #sonserina #contabilidade #potter",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/368046365_823711759185336_6310026972469442206_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=TFi481T2k-0AX-d256v&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfD_oYbArezYkUTwppLdICdcp5CYIEdJAQIGA4ioLr1bAg&oe=651C73D2",
                    "permalink": "https:\/\/www.instagram.com\/p\/CwOI94jIyYf\/",
                    "timestamp": "2023-08-21T21:00:07+0000"
                },
                {
                    "id": "18309417106096345",
                    "caption": "🚀 Do Zero ao Milhão: Estratégias para Fazer Sua Empresa Crescer\n\n1️⃣ Planejamento Sólido: Estabeleça metas claras e tangíveis.\n\n2️⃣ Conheça Seu Público: Saiba exatamente quem são seus clientes.\n\n3️⃣ Marketing Eficiente: Aposte em estratégias que impactem.\n\n4️⃣ Inovação Contínua: Esteja sempre atualizado e aberto a novidades.\n\n5️⃣ Gestão Eficiente: Organize processos para maximizar eficiência.\n\n6️⃣ Excelência no Atendimento: Surpreenda e fidelize seus clientes.\n\n7️⃣ Parcerias Estratégicas: Colabore para alcançar novos horizontes.\n\nCom essas táticas, sua empresa estará pronta para voar rumo ao sucesso!🚀💼\n\n#estratégias #crescimento #dozeroaomilhão #sucesso #tax #contabilidade",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/365953602_817330143156831_4849469593598653611_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=aWL1P4WMncsAX9LXTYZ&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBiP2o77PsLJ3FefrWd0ZEjFlgpDJLxeobpMKdciTSQyw&oe=651C0777",
                    "permalink": "https:\/\/www.instagram.com\/p\/CwGakpLsmMp\/",
                    "timestamp": "2023-08-18T21:00:02+0000"
                },
                {
                    "id": "17846179317043850",
                    "caption": "A contabilidade é nossa passarela e nossos contadores são verdadeiras estrelas! 🌟💼\n\nCom desempenho dignos do tapete vermelho, eles transformam números em histórias de sucesso.\n\nNossa equipe brilha nas melhores práticas, e o troféu vai para aqueles que transformam balanços em verdadeiros blockbusters financeiros! 🎬🔍\n\n#oscar #sucesso #tax #contabilidade",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/365262700_817329626490216_8555318262985024492_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=1FFiHigSHNUAX8Uf1MJ&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAEHkWexPLRspp8oLPmKDpIAmT5ypvrb9EpHOXNNmjYdQ&oe=651CE0BF",
                    "permalink": "https:\/\/www.instagram.com\/p\/CwBQ_hPJ2Bo\/",
                    "timestamp": "2023-08-16T21:00:07+0000"
                },
                {
                    "id": "18356095585075220",
                    "caption": "✈️ Quer ver sua empresa voar alto? Siga esses passos:\n\n1️⃣ Plano de Voo: Trace metas claras e objetivas.\n\n2️⃣ Tripulação Unida: Tenha uma equipe comprometida.\n\n3️⃣ Combustível Financeiro: Mantenha um fluxo de caixa saudável.\n\n4️⃣ Estratégia de Navegação: Esteja atento ao mercado.\n\n5️⃣ Check-in Regular: Avalie e ajuste seu plano.\n\nCom esses elementos, sua empresa decolará e alcançará novos horizontes!✈️\n\n#empreendedorismo #sucesso #contabilidade #tax",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/366003102_817328703156975_7911170271120979538_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=aHuod7xk9R4AX_Wn4k0&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB5SviHtTUj3Dz-vcObykbPsN5pGAieVNCO_pfGJNQ1vQ&oe=651C39CC",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cv8HaDEIv5Q\/",
                    "timestamp": "2023-08-14T21:00:10+0000"
                },
                {
                    "id": "17993536013129244",
                    "caption": "Neste Dia dos Pais, queremos homenagear três homens incríveis, que provaram que a paternidade não conhece limites. @clodomiro.neto  @isaacfp21 e @thalestax, vocês são exemplos de amor incondicional, que se estendem além dos laços de sangue e alcançam a mais profunda conexão de alma e coração.\n\nFeliz dia dos Pais! \n\n#pai #felizdiadospais #pais",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/366025342_816050706618108_4966244619089503334_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=WC5k_wg81wUAX-mALNM&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB75nkAaPNP_RNTJ6M-ol118YINMh1jW4aThRHyazZvsA&oe=651B8CBE",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cv4rrVrvD1P\/",
                    "timestamp": "2023-08-13T13:00:08+0000"
                },
                {
                    "id": "18235367836209368",
                    "caption": "Assim como um semáforo guia o trânsito, indicadores financeiros nos orientam.\n\nObservar margens de lucro, fluxo de caixa e endividamento ajuda a antecipar problemas. Se as margens caem ou o fluxo de caixa aperta, ação é necessária! Além disso, a rentabilidade de produtos aponta áreas que precisam de ajustes.\n\nAgir rápido com base nessas informações mantém sua empresa nos trilhos do crescimento. 📊💰\n\n#sucesso #contabilidade #tax",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/365905332_817327619823750_9023433459823366430_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=oM3U1HkDTgYAX-gO2eM&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB_dgmvyVyYNcHSiy8u8GLKMJVkce28OtAqhmkYwLLs_A&oe=651CCD31",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cvx0OPqomXt\/",
                    "timestamp": "2023-08-10T21:00:07+0000"
                },
                {
                    "id": "17996346746010088",
                    "caption": "🎉🎂 Parabéns, @psd.alisson ! 🥳 Que sua criatividade seja tão infinita quanto o feed do Instagram🎉✨ \n#FelizAniversário #marketing",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/364130825_811118707111308_3526537936770093552_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=Hefit93-C0UAX-6SIGj&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDUAGdCvCO6Hfim4_npaA58HcTc3M6YXovAzW0_fqyeeQ&oe=651CB423",
                    "permalink": "https:\/\/www.instagram.com\/p\/CvXHC69taS2\/",
                    "timestamp": "2023-07-31T12:05:06+0000"
                },
                {
                    "id": "18020740819617686",
                    "caption": "O Cafezeiro e a fidelidade! ☕️\n#cafe #empreendedorismo",
                    "media_type": "VIDEO",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/o1\/v\/t16\/f1\/m82\/DF4959CDD41E0B6C4E1141C486130698_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&vs=1259980797987538_1710677309&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9ERjQ5NTlDREQ0MUUwQjZDNEUxMTQxQzQ4NjEzMDY5OF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR09KNHFoVVFGWWQ1cFI4Q0FQZXdiRWNEenF0MGJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAmsIu6%2F9329T8VAigCQzMsF0BQFCj1wo9cGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfBjPmXsQtFpfR-z9gRZMvUFgMRWS5x5C0zw6nXv9gVxbw&oe=6518EA85&_nc_sid=1d576d&_nc_rid=5e7324dd6b",
                    "permalink": "https:\/\/www.instagram.com\/reel\/CvM6KxYOwlm\/",
                    "timestamp": "2023-07-27T13:00:00+0000"
                },
                {
                    "id": "18273482995148507",
                    "caption": "Pega essa sequência de cliques do treinamento que está acontecendo essa semana! 🔥",
                    "media_type": "CAROUSEL_ALBUM",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/362254657_808500750706437_5598167955140200337_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=WnPGMjhJ9UAAX-8gadO&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDEiA-Do5cK7bY6h1OrGMr1FZjMgmzd3cM2_b1tSeDdTA&oe=651B2879",
                    "permalink": "https:\/\/www.instagram.com\/p\/CvK0V3vO9TF\/",
                    "timestamp": "2023-07-26T17:30:46+0000"
                },
                {
                    "id": "17905663307805260",
                    "caption": "Muito mais que números, muito mais que uma simples empresa contábil! 🔥🎯\n\n#taxcontabilidade #contabilidade",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/358729763_713048600588059_2540263878223084682_n.png?stp=dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=j6wSZuwHazgAX-RrJQ1&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfDHlmbnUuYAkp68dqAgsQk2B0UtdFlEdggsPz7WrGG4eg&oe=651B1969",
                    "permalink": "https:\/\/www.instagram.com\/p\/CvGCtHYrk55\/",
                    "timestamp": "2023-07-24T21:00:05+0000"
                },
                {
                    "id": "18303910006097977",
                    "caption": "Treinamento Contábil🔥🎯\n\n#treinamento #contabilidade",
                    "media_type": "VIDEO",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/o1\/v\/t16\/f1\/m82\/E6425F2BBE3844CBD7901DDC78F37691_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=111&vs=807034461147938_2291861960&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9FNjQyNUYyQkJFMzg0NENCRDc5MDFEREM3OEYzNzY5MV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0xIN3B4V2F0OVN6LVZzQ0FOSzhmTVJJQlZrYWJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAm%2BMix%2BavQ9j8VAigCQzMsF0BPlYEGJN0vGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfBQxl6Bm9HrfazPAChatPi6aHY6xZseFtbnDk4ujIIx2w&oe=6518D31B&_nc_sid=1d576d&_nc_rid=55dd984e45",
                    "permalink": "https:\/\/www.instagram.com\/reel\/CvFEg2LNpc5\/",
                    "timestamp": "2023-07-24T11:57:26+0000"
                },
                {
                    "id": "18217544668216889",
                    "caption": "Redução de taxas do pronampe!🔥\n\n#pronampe #contabilidade",
                    "media_type": "VIDEO",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/o1\/v\/t16\/f1\/m82\/C640BB00718C62BB06AAD415CDDF0199_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=105&vs=968171097752907_825495435&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9DNjQwQkIwMDcxOEM2MkJCMDZBQUQ0MTVDRERGMDE5OV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0Z4dWNSWGdUYVNsY3ZRQUFHbzZtSnJBZ09sWWJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAm4t%2FDjtiL%2Bj8VAigCQzMsF0BAk3S8an76GBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfDERsd-k-xjND7raENjfrohdPxikbh6-Erl4fqCWv-qMw&oe=6518BC27&_nc_sid=1d576d&_nc_rid=1dc3963dea",
                    "permalink": "https:\/\/www.instagram.com\/reel\/Cu-UcmTJwXR\/",
                    "timestamp": "2023-07-21T21:01:25+0000"
                },
                {
                    "id": "18257048125083981",
                    "caption": "Descubra a Força da Contabilidade: A Energia que Impulsiona o Sucesso Empresarial!\n\nAssim como Oppenheimer e sua equipe trabalharam juntos no Projeto Manhattan para desenvolver uma tecnologia poderosa, a contabilidade desempenha um papel crucial na construção de bases sólidas para o seu negócio.\n\nDeixe- nos guiar seus esforços financeiros, equilibrando os números e liberando a energia necessária para sustentar o crescimento e alcançar resultados extraordinários.\n\nA contabilidade é a chave para a explosão do sucesso empresarial! 💼💥\n\n#oppenheimer #contabilidade ##empresário",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/361205504_803267417896437_6517468117590327147_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=eYjXZiJpz68AX-cmpKO&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfA2id25MQ-8wNi9SEVlBxQbzgJtXVRMo_vW695ZeyorFQ&oe=651BABA7",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cu9rICCITm-\/",
                    "timestamp": "2023-07-21T15:00:07+0000"
                },
                {
                    "id": "18024847339580400",
                    "caption": "Lei 14.611- Discriminação Salarial💰\n\n#clt #contabilidade",
                    "media_type": "VIDEO",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/o1\/v\/t16\/f1\/m82\/FE42BB8DEAA1BFC12E0844569EF22FAE_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&vs=239149158958444_4274239582&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9GRTQyQkI4REVBQTFCRkMxMkUwODQ0NTY5RUYyMkZBRV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0pVdGtSVmxTeUxSU3BBV0FJTlhsT1haRXRFcWJxX0VBQUFGFQICyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAmvI%2B2oLv1hkAVAigCQzMsF0BPkrAgxJumGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHUAAA%3D%3D&ccb=9-4&oh=00_AfBlKOv6BJRUc9JLtGQ2bwd3Q-_A9bmM3XU57p7C6Y3UOQ&oe=6518B134&_nc_sid=1d576d&_nc_rid=455226c426",
                    "permalink": "https:\/\/www.instagram.com\/reel\/Cu64rH2tSb3\/",
                    "timestamp": "2023-07-20T13:01:10+0000"
                },
                {
                    "id": "17990105708136225",
                    "caption": "Assim como a Barbie encontrou sua jornada para a felicidade no mundo humano, você pode encontrar o sucesso empresarial com a ajuda da contabilidade adequada. Deixe-nos cuidar dos detalhes financeiros e permitir que sua empresa brilhe, independentemente da aparência. A verdadeira felicidade empresarial começa quando você encontra uma parceria certa. 💼✨\n\n#barbie #barbiegirl #contabilidade #empresário #rosa",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/359331498_801778128045366_7490064605163822842_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=qDtFB0LhpLcAX_Ad-d0&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfD7hVPEtR_gl-PpTTPdtODGKK8Ha0TDoPjH8Jgf2KjxGA&oe=651B32F1",
                    "permalink": "https:\/\/www.instagram.com\/p\/Cu4hiS8Okfm\/",
                    "timestamp": "2023-07-19T15:00:07+0000"
                },
                {
                    "id": "17872622033891967",
                    "caption": "🚀📊 Prepare-se para a Invasão Contábil mais surpreendente do universo empresarial! Os Skrulls podem até dominar a transformação física, mas nós dominamos os números! 💼💥\n\nNesta batalha pelo equilíbrio financeiro, não há espaço para erros. Com precisão e criatividade, nossos contadores estão prontos para desvendar cada segredo nas planilhas e garantir a vitória para o seu negócio. 🕵️‍♂️💰\n\nQuando se trata de lidar com números, confie em especialistas que estão um passo à frente. Junte-se à resistência e proteja sua empresa dos desafios financeiros. A invasão começou e juntos vamos triunfar! 💪📚\n\n#InvasãoContábil #Skrulls #ProtegendoSeusNúmeros #invasãosecreta #marvel",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/360088189_801756924714153_3070195166107638989_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=8XuSG1PLElIAX_JM7xq&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfApgEtY-fLREME2IzqQuD5g6MKZy4tklo9NCZ6iNoQtzQ&oe=651C3B00",
                    "permalink": "https:\/\/www.instagram.com\/p\/CuzX8TGNJmb\/",
                    "timestamp": "2023-07-17T15:00:05+0000"
                },
                {
                    "id": "18022886533590466",
                    "caption": "🌟 Chame atenção, prenda olhares e venda com criatividade! Sua Ideia Empresarial no Palco é a atração imperdível que vai conquistar o público da ExpoCrato. Prepare-se para um show que vai inspirar, encantar e sustentar seus negócios! 💼✨\n\nAgora que chamei sua atenção para esse falso post. Ser criativo e chamar a atenção são aspectos fundamentais para o sucesso do seu negócio. Atrair a atenção do público é o primeiro passo para conquistar clientes e suas vendas.\n\n#Expocrato #ShowDeIdeias #criatividadeemação",
                    "media_type": "IMAGE",
                    "media_url": "https:\/\/scontent.cdninstagram.com\/v\/t39.30808-6\/359836981_801618301394682_6482690028435336681_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=sV_gsMgWKH0AX_AgPxl&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfC57NTgNnKLpSpZy9Y-Nfs8pWg4GFcMRhNSPSejAkvPUQ&oe=651C36D6",
                    "permalink": "https:\/\/www.instagram.com\/p\/CurfAmAMZsq\/",
                    "timestamp": "2023-07-14T13:27:55+0000"
                }
            ],
            "paging": {
                "cursors": {
                    "before": "QVFIUlhSSFpvM0ZAGSGRhUVNvYUt5Mk5XeVZAGdk5CWDlOeEc4LTREWnRLcmFRNEFuWERxbGZAWLXY0SzVUa0JsSGthZATdtX1k3UDhoRmM1SldnaEdLQ0tJbXVn",
                    "after": "QVFIUnA1V1kzTHFWQ0tUVE1aOEppcHFVUFZACaWt3ZAnhZAMGV4WktjdGNDdjZAQZAkdkcUp3N0R0ZAEJqOUQ4RHZA4NWR6N1o3UGVqUW04TWJNVWZAPRmNvN3JZAaUF3"
                },
                "next": "https:\/\/graph.instagram.com\/v18.0\/17841400234206711\/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=IGQWRObUpzRXh3RnI5TG9uZAU9mRERHUEozTVBIZAGRoNFdFY0lxVy1BQlRaN0lKcktfbFQtc1B2THExSENRN1JITkhONFFKdU4wakIxOFY3dmFiUVpfSUtSSE5hZATMwVWJhTnFOYmpjeUFyOGxMdG5fQlN1TFhjb3ZA4R1AyQjkwbjhtQQZDZD&limit=25&after=QVFIUnA1V1kzTHFWQ0tUVE1aOEppcHFVUFZACaWt3ZAnhZAMGV4WktjdGNDdjZAQZAkdkcUp3N0R0ZAEJqOUQ4RHZA4NWR6N1o3UGVqUW04TWJNVWZAPRmNvN3JZAaUF3"
            }
        },
        { status: 200 }
    )
}