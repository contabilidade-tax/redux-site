'use client'
import { Button } from "@/components/ui/button"
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Page() {
  const api_base = 'https://api.instagram.com'
  const oauth_url = '/oauth/authorize'
  const home = 'https://redux.app.br'
  // const home = 'http://192.168.10.57:3004'
  const appId = '290671173722965'
  const scope = 'user_profile,user_media'
  const redirectUri = `${home}/api/instaData/authorize/`

  function getUserOauth() {


    return redirect(`${api_base}${oauth_url}?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`)
    // axios.post(
    //   `${api_base}${oauth_url}`, {},
    //   {
    //     params: {
    //       client_id: appId,
    //       redirect_uri: redirectUri,
    //       scope,
    //       response_type: 'code',
    //     }
    //   }
    // ).then(response => {
    //   return response
    // }).catch(error => {
    //   console.log(error)
    // })

  }

  return (
    <div className="flex flex-col items-center justify-center my-10 gap-10 max-w-[500px]">
      <h1 className="text-3xl font-bold text-primary-color text-center">Descrição do Uso do Aplicativo:</h1>
      <p>Este aplicativo foi desenvolvido especificamente para a autorização e credenciamento da TAX Contabilidade,
        permitindo a obtenção de um token de acesso essencial para visualizações básicas de perfil e dos últimos posts da TAX Contabilidade no Instagram.</p>
      <Accordion type="single" collapsible className="w-full max-w-[459px]">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base">Autorização e Credenciamento</AccordionTrigger>
          <AccordionContent>
            O aplicativo facilita o processo de autenticação, permitindo que a TAX Contabilidade obtenha os tokens de acesso necessários para interagir com a API do Instagram.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base">Visualização de Perfil e Posts</AccordionTrigger>
          <AccordionContent>
            Uma vez autorizado, o aplicativo fornece uma visualização básica do perfil da TAX Contabilidade no Instagram, bem como dos posts mais recentes publicados.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-base">Restrições de Uso por Terceiros</AccordionTrigger>
          <AccordionContent>
            O uso desta URL e do aplicativo por terceiros não resultará em nenhuma interação com o Facebook ou com a API do Instagram, além do escopo definido para a TAX Contabilidade. Qualquer tentativa de uso indevido ou fora do contexto autorizado não será atendida pelo sistema e pode estar sujeita a restrições ou consequências legais.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-base">Botão de Autorização</AccordionTrigger>
          <AccordionContent>
            O botão abaixo serve como o ponto inicial para o processo de autorização. Ao clicar neste botão, você estará dando início ao processo de credenciamento e autorização, conforme descrito acima.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="font-bold text-xl">Importante:</AccordionTrigger>
          <AccordionContent>
            <span className="font-bold">- URL Privada:</span> A URL utilizada para a autorização é privada e destinada exclusivamente à TAX Contabilidade. Seu uso é estritamente limitado à obtenção de acesso para as finalidades mencionadas acima.
            <br />
            <br />
            <span className="font-bold">- Sobre o App:</span> Esta ferramenta foi criada para atender às necessidades específicas de acesso e visualização da TAX Contabilidade, assegurando conformidade e segurança no manejo de dados e informações públicas do perfil no Instagram.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link target='_blank' href={`${api_base}${oauth_url}?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`}>
        <Button
          variant="outline"
          className='bg-primary-color font-medium text-lg'
        >Authorize</Button>
      </Link>
    </div>
  )
}