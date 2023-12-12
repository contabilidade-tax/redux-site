'use client'
import { Input } from '../ui/input'
import { EmailProps } from '@/types'
import { Tailwind, Container, Heading, Link, Text, Html, Head, Preview, Section, Row, Column, Img, Body, Hr } from "@react-email/components";
import { render as Render } from '@react-email/render';
import * as React from 'react';

export function render(data: any) {
  const htmlContent = Render(<Email {...data} />, { pretty: true });
  return htmlContent
}


export default function Email({ name, cidade, email, message, estado, whatsapp }: EmailProps) {

  return (
    <Html lang='pt-BR'>
      <Head />
      <Preview>{name}, enviou seu currículo para trabalhar conosco através do site!</Preview>;
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                borderBodyColor: "rgb(176 190 197 / 1)",
              },
            },
          },
        }}>
        <Body className='font-sans bg-white mx-auto'>
          <Container className="flex h-full p-[24px]">
            <Section className="w-[550px] border-2 border-solid border-gray-600/80 flex flex-col gap-[16px]">
              {/* HEADER */}
              <Container className="flex justify-center p-[8px] mx-auto">
                <Row align='center'>
                  <Column align='center'>
                    <Img
                      src="https://redux.app.br/assets/img/logo-verde-cortada.png"
                      alt="Logo TAX"
                      width={280}
                      height={110}
                      className="object-center object-contain" />
                  </Column>
                </Row>
              </Container>
              {/* BODY */}
              <Container className="flex flex-col justify-between items-center flex-1 px-[16px] gap-[16px]">
                <Heading as='h1' className="text-[36px] leading-[40px] text-center"><span className="font-bold">{name}</span>, enviou seu currículo para trabalhar conosco através do site!</Heading>
                <Container className='flex flex-col justify-start gap-[24px] p-[24px] border-2 border-solid border-borderBodyColor'>
                  <Heading as='h2' className='text-[20px] leading-[28px] self-start font-semibold text-primary-color'>Resumo de seus dados: </Heading>
                  {/* FIELDS */}
                  <Section className='dataFields flex flex-col gap-[12px]'>
                    <Row className='email flex items-center gap-[8px]'>
                      <Column align='left'>
                        <Text>Nome: </Text>
                      </Column>
                      <Column align='right'>
                        <Input type="text" placeholder="Nome" className='border border-solid border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={name} />
                      </Column>
                    </Row>
                    <Row className='email flex items-center gap-[8px]'>
                      <Column align='left'>
                        <Text>Email: </Text>
                      </Column>
                      <Column align='right'>
                        <Input type="text" placeholder="email" className='border border-solid border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={email} />
                      </Column>
                    </Row>
                    <Row className='email flex items-center gap-[8px]'>
                      <Column align='left'>
                        <Text>Whatsapp: </Text>
                      </Column>
                      <Column align='right'>
                        <Input type="text" placeholder="Whatsapp" className='border border-solid border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={whatsapp} />
                      </Column>
                    </Row>
                    <Row className='email flex items-center gap-[8px]'>
                      <Column align='left'>
                        <Text>Cidade: </Text>
                      </Column>
                      <Column align='right'>
                        <Input type="text" placeholder="Cidade" className='border-2 border-solid border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={cidade} />
                      </Column>
                    </Row>
                    <Row className='email flex items-center gap-[8px]'>
                      <Column align='left'>
                        <Text>Estado: </Text>
                      </Column>
                      <Column align='right'>
                        <Input type="text" placeholder="Estado" className='border-2 border-solid border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={estado} />
                      </Column>
                    </Row>
                    <Row className='email flex items-center gap-[8px]'>
                      <Column align='left'>
                        <Text>Mensagem: </Text>
                      </Column>
                      <Column align='right'>
                        <Input type="text" placeholder="Mensagem" className='border-2 border-solid border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={message} />
                      </Column>
                    </Row>
                  </Section>
                </Container>
              </Container>
              <Hr />
              {/* FOOTER  */}
              <Container>
                <Row className="bg-gray-200 p-[20px] flex justify-between text-gray-800">
                  <Column className="mb-[24px] flex-1 max-w-[300px]">
                    <Heading as='h3' className="text-[18px] leading-[28px] font-semibold mb-[8px]">Sobre</Heading>
                    <Text className="text-[14px] leading-[20px]">Este e-mail é uma comunicação automática gerada no processo de candidatura de um interessado na empresa  através da seção "Trabalhe Conosco" no site da Redux.</Text>
                  </Column>
                  <Column className="mb-[24px] flex-1">
                    <Heading as='h3' className="text-[18px] leading-[28px] font-[600] mb-[8px]">Contato</Heading>
                    <Text className="text-[12px] leading-[16px]">Av. Virgílio Távora, 11 - Fátima, Juazeiro do Norte-CE</Text>
                    <Text className="text-[12px] leading-[16px]">programacao@contabilidade-tax.com.br</Text>
                  </Column>
                  <Column className='mb-[24px] w-[120px] mx-auto'>
                    <Heading as='h3' className="text-[18px] leading-[28px] font-semibold mb-[8px]">Links Úteis</Heading>
                    <Row className='flex flex-col'>
                      <Column>
                        <Link href="https://redux.app.br/home" className="mb-[4px] text-[14px] leading-[20px] hover:underline">Home</Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <Link href="https://redux.app.br/home#servicos" className="mb-[4px] text-[14px] leading-[20px] hover:underline">Serviços</Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <Link href="https://redux.app.br/trabalhe-conosco" className="text-[14px] leading-[20px] hover:underline">Trabalhe conosco</Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Container>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
