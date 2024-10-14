// 'use client'
import { Input } from "../ui/input";
import { EmailProps } from "@/types";
import {
  Container,
  Heading,
  Link,
  Text,
  Html,
  Head,
  Preview,
  Section,
  Row,
  Column,
  Img,
  Body,
  Hr,
} from "@react-email/components";
import Image from "next/image";
import * as React from "react";

export default function Email({
  name,
  cidade,
  email,
  message,
  estado,
  whatsapp,
}: EmailProps) {
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const columnStyle = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "rgba(0, 0, 0, 0.7)",
    color: "black",
    minWidth: "250px",
    fontWeight: "bold",
  };

  const footerColumn = {
    marginBottom: "24px",
    width: "280px",
  };
  const footerHeading = {
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>
        {name}, enviou seu currículo para trabalhar conosco através do site!
      </Preview>
      ;
      <Body className="mx-auto bg-white font-sans">
        <Container
          style={{
            display: "flex",
            height: "100%",
            padding: "24px",
          }}
        >
          <Section
            style={{
              width: "550px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "rgba(96, 96, 96, 0.8)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* HEADER */}
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "8px",
                margin: "auto",
              }}
            >
              <Row align="center">
                <Column align="center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/logo-verde-cortada.png`}
                    alt="Logo TAX"
                    title="logo_TAX"
                    width={280}
                    height={110}
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                </Column>
              </Row>
            </Container>
            {/* BODY */}
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                flex: "1",
                padding: "16px",
                gap: "16px",
              }}
            >
              <Heading
                as="h1"
                style={{
                  fontSize: "36px",
                  lineHeight: "40px",
                  textAlign: "center",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{name}</span>, enviou seu
                currículo para trabalhar conosco através do site!
              </Heading>
              <Container
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  gap: "24px",
                  padding: "24px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "rgba(176, 190, 197, 1)",
                }}
              >
                <Heading
                  as="h2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    alignSelf: "start",
                    fontWeight: "bold",
                    color: "rgb(213, 161, 21)",
                  }}
                >
                  Resumo de seus dados:
                </Heading>
                {/* FIELDS */}
                <Section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Row style={rowStyle}>
                    <Column align="left">
                      <Text>Nome: </Text>
                    </Column>
                    <Column align="right">
                      <Input
                        type="text"
                        placeholder="Nome"
                        style={columnStyle}
                        disabled={true}
                        defaultValue={name}
                      />
                    </Column>
                  </Row>
                  <Row style={rowStyle}>
                    <Column align="left">
                      <Text>Email: </Text>
                    </Column>
                    <Column align="right">
                      <Input
                        type="text"
                        placeholder="email"
                        style={columnStyle}
                        disabled={true}
                        defaultValue={email}
                      />
                    </Column>
                  </Row>
                  <Row style={rowStyle}>
                    <Column align="left">
                      <Text>Whatsapp: </Text>
                    </Column>
                    <Column align="right">
                      <Input
                        type="text"
                        placeholder="Whatsapp"
                        style={columnStyle}
                        disabled={true}
                        defaultValue={whatsapp}
                      />
                    </Column>
                  </Row>
                  <Row style={rowStyle}>
                    <Column align="left">
                      <Text>Cidade: </Text>
                    </Column>
                    <Column align="right">
                      <Input
                        type="text"
                        placeholder="Cidade"
                        style={columnStyle}
                        disabled={true}
                        defaultValue={cidade}
                      />
                    </Column>
                  </Row>
                  <Row style={rowStyle}>
                    <Column align="left">
                      <Text>Estado: </Text>
                    </Column>
                    <Column align="right">
                      <Input
                        type="text"
                        placeholder="Estado"
                        style={columnStyle}
                        disabled={true}
                        defaultValue={estado}
                      />
                    </Column>
                  </Row>
                  <Row style={rowStyle}>
                    <Column align="left">
                      <Text>Mensagem: </Text>
                    </Column>
                    <Column align="right">
                      <Input
                        type="text"
                        placeholder="Mensagem"
                        style={columnStyle}
                        disabled={true}
                        defaultValue={message}
                      />
                    </Column>
                  </Row>
                </Section>
              </Container>
            </Container>
            <Hr />
            {/* FOOTER  */}
            <Container>
              <Row
                style={{
                  backgroundColor: "rgba(192, 192, 192, 1)",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(128, 128, 128, 1)",
                }}
              >
                <Column style={footerColumn}>
                  <Heading as="h3" style={footerHeading}>
                    Sobre
                  </Heading>
                  <Text
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Este e-mail é uma comunicação automática gerada no processo
                    de candidatura de um interessado na empresa através da seção
                    "Trabalhe Conosco" no site da Redux.
                  </Text>
                </Column>
                <Column style={{ marginBottom: "24px", width: "150px" }}>
                  <Heading as="h3" style={footerHeading}>
                    Contato
                  </Heading>
                  <Text style={{ fontSize: "12px", lineHeight: "16px" }}>
                    Av. Virgílio Távora, 11 - Fátima, Juazeiro do Norte-CE
                  </Text>
                  <Text style={{ fontSize: "12px", lineHeight: "16px" }}>
                    programacao@contabilidade-tax.com.br
                  </Text>
                </Column>
                <Column
                  style={{
                    marginBottom: "24px",
                    width: "120px",
                    margin: "auto",
                  }}
                >
                  <Heading as="h3" style={footerHeading}>
                    Links Úteis
                  </Heading>
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <Column>
                      <Link
                        href="https://contabilidade.gruporedux.com.br"
                        style={{
                          marginBottom: "4px",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                        className="links"
                      >
                        Home
                      </Link>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="https://contabilidade.gruporedux.com.br/#servicos"
                        style={{
                          marginBottom: "4px",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        Serviços
                      </Link>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="https://contabilidade.gruporedux.com.br/trabalhe-conosco"
                        style={{
                          marginBottom: "4px",
                          fontSize: "14px",
                          lineHeight: "20px",
                        }}
                      >
                        Trabalhe conosco
                      </Link>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Container>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
