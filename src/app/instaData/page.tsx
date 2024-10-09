import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import crypto from "crypto";

function criptografar(texto: any, chave: any, iv: any) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(chave, "hex"),
    Buffer.from(iv, "hex")
  );
  let textoCriptografado = cipher.update(texto);
  textoCriptografado = Buffer.concat([textoCriptografado, cipher.final()]);
  return iv.toString("hex") + ":" + textoCriptografado.toString("hex");
}

export default function Page() {
  const api_base = "https://api.instagram.com/oauth/authorize";
  const appId = process.env.NEXT_PUBLIC_API_IG_APP_ID;
  const scope = "user_profile,user_media";
  const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;
  const iv = process.env.NEXT_PUBLIC_CRYPTO_IV;
  const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
  const redirectUri = `https://contabilidade.gruporedux.com.br/api/instaData/authorize/${encodeURIComponent(
    criptografar(token, key, iv)
  )}/`;

  return (
    <div className="my-10 flex max-w-[500px] flex-col items-center justify-center gap-10">
      <h1 className="text-center text-3xl font-bold text-primary-color">
        Application Usage Description:
      </h1>
      <p>
        This application was specifically developed for the authorization and
        accreditation of TAX Accounting, enabling the acquisition of an
        essential access token for basic profile views and recent posts of TAX
        Accounting on Instagram.
      </p>
      <Accordion type="single" collapsible className="w-full max-w-[459px]">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base">
            Authorization and Accreditation
          </AccordionTrigger>
          <AccordionContent>
            The application facilitates the authentication process, allowing TAX
            Accounting to obtain the necessary access tokens to interact with
            the Instagram API.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base">
            Profile and Posts Viewing
          </AccordionTrigger>
          <AccordionContent>
            Once authorized, the application provides a basic view of TAX
            Accounting's Instagram profile, as well as the most recent posts
            published.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-base">
            Third-Party Usage Restrictions
          </AccordionTrigger>
          <AccordionContent>
            The use of this URL and application by third parties will not result
            in any interaction with Facebook or the Instagram API beyond the
            scope defined for TAX Accounting. Any attempts at misuse or
            unauthorized context will not be serviced by the system and may be
            subject to restrictions or legal consequences.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-base">
            Authorization Button
          </AccordionTrigger>
          <AccordionContent>
            The button below serves as the starting point for the authorization
            process. By clicking this button, you will initiate the
            accreditation and authorization process, as described above.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-xl font-bold">
            Important:
          </AccordionTrigger>
          <AccordionContent>
            <span className="font-bold">- Private URL:</span> The URL used for
            authorization is private and intended exclusively for TAX
            Accounting. Its use is strictly limited to obtaining access for the
            purposes mentioned above.
            <br />
            <br />
            <span className="font-bold">- About the App:</span> This tool was
            created to meet the specific access and viewing needs of TAX
            Accounting, ensuring compliance and security in the handling of
            public data and information from the Instagram profile.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link
        target="_blank"
        href={`${api_base}?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`}
      >
        <Button
          variant="outline"
          className="bg-primary-color text-lg font-medium"
        >
          Authorize
        </Button>
      </Link>
    </div>
  );
}
