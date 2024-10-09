"use client";
import { Button } from "@/components/ui/button";
import { renderizar } from "@/components/Email/render";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";
import * as z from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputMask from "react-input-mask";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./form.scss";
import { validateRecaptcha } from "@/common/actions/recaptcha";
import { sendWorkWithUsMail } from "@/common/actions/rhSendMail";

type Person = {
  name: string;
  email: string;
  whatsapp: string;
};

type cookieType = {
  sent: Person[];
};

const formSchema: any = z.object({
  name: z.string().min(2, {
    message: "Nome precisa ter no mínimo 2 caracteres",
  }),
  email: z.string().email({
    message: "Email não é válido",
  }),
  whatsapp: z
    .string()
    .min(11, {
      message:
        "WhatsApp precisa ter no mínimo 11 dígitos no formato (99) 99999-9999",
    })
    .regex(/^[0-9]+$/, {
      message: "Forneça apenas números, não letras!",
    })
    .regex(/^\d{11}$/, {
      message: "WhatsApp não está no formato correto (99) 99999-9999",
    }),
  cidade: z
    .string()
    .toLowerCase()
    .refine((value) => value.trim() !== "", {
      message: "Informe sua cidade",
    }),
  message: z
    .string()
    .max(255, {
      message: "Mensagem demasiado longa",
    })
    .refine((value) => value.trim() !== "", {
      message: "Mensagem não pode estar em branco",
    }),
  estado: z
    .string({
      required_error: "UF não pode estar em branco",
    })
    .length(2, {
      message: "UF precisa ter 2 dígitos",
    }),
  arquivo: z.any().optional(),
});

type FileState = {
  file: string;
  type: string;
  name: string;
} | null;

const estadosDoBrasil = [
  {
    name: "Acre",
    UF: "AC",
  },
  {
    name: "Alagoas",
    UF: "AL",
  },
  {
    name: "Amapá",
    UF: "AP",
  },
  {
    name: "Amazonas",
    UF: "AM",
  },
  {
    name: "Bahia",
    UF: "BA",
  },
  {
    name: "Ceará",
    UF: "CE",
  },
  {
    name: "Distrito Federal",
    UF: "DF",
  },
  {
    name: "Espírito Santo",
    UF: "ES",
  },
  {
    name: "Goiás",
    UF: "GO",
  },
  {
    name: "Maranhão",
    UF: "MA",
  },
  {
    name: "Mato Grosso",
    UF: "MT",
  },
  {
    name: "Mato Grosso do Sul",
    UF: "MS",
  },
  {
    name: "Minas Gerais",
    UF: "MG",
  },
  {
    name: "Pará",
    UF: "PA",
  },
  {
    name: "Paraíba",
    UF: "PB",
  },
  {
    name: "Paraná",
    UF: "PR",
  },
  {
    name: "Pernambuco",
    UF: "PE",
  },
  {
    name: "Piauí",
    UF: "PI",
  },
  {
    name: "Rio de Janeiro",
    UF: "RJ",
  },
  {
    name: "Rio Grande do Norte",
    UF: "RN",
  },
  {
    name: "Rio Grande do Sul",
    UF: "RS",
  },
  {
    name: "Rondônia",
    UF: "RO",
  },
  {
    name: "Roraima",
    UF: "RR",
  },
  {
    name: "Santa Catarina",
    UF: "SC",
  },
  {
    name: "São Paulo",
    UF: "SP",
  },
  {
    name: "Sergipe",
    UF: "SE",
  },
  {
    name: "Tocantins",
    UF: "TO",
  },
];

export default function ContactForm({ className }: { className?: string }) {
  const [whatsappValue, setWhatsappValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [captchaOk, setCaptchaOk] = useState<boolean>(false);
  const [checkingCaptcha, setCheckingCaptcha] = useState(false);
  const [file, setFile] = useState<FileState>();
  const { alreadySent } = parseCookies();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        setFile({
          file: base64.split(",")[1],
          type: file.type,
          name: file.name,
        });
      };
    } else {
      console.log("Nenhum arquivo selecionado");
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      cidade: "",
      message: "",
      estado: "CE",
      arquivo: "",
    },
  });

  const clearForm = () => {
    // Limpa pro próximo envio
    setIsSending(false);
    // LIMPA o CAPTCHA
    recaptchaRef.current?.reset();
    setCaptchaOk(false);
  };

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (checkingCaptcha) return;
    // Seta o IsSending
    // Somete após validar o form
    setIsSending(true);

    if (!captchaOk) {
      toast.error("Preencha o Captcha rapaz!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Limpa o form
      clearForm();
      return;
    }

    if (!file) {
      toast.error("Tá esquecendo do currículo não??", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Limpa o form
      clearForm();
      return;
    }

    let cookieObj: cookieType;
    if (alreadySent) {
      cookieObj = JSON.parse(alreadySent);
      let throwToastError = false;

      cookieObj.sent.forEach((person) => {
        if (person.email === data.email || person.whatsapp === data.whatsapp) {
          throwToastError = true;
          toast.error(
            <div className="space-y-1">
              <p className="font-bold">{person.name}</p>
              <p>Seja Paciente!</p>
              <p>Você já está em nossa seletiva</p>
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              className: "-translate-x-8 drop-shadow-custom",
            }
          );
        }
      }); // FIM DO FOREACH
      if (throwToastError) {
        // Limpa o form
        clearForm();
        return;
      }
    }

    // Continue com o fluxo normal
    const emailRender = renderizar(data).then((html) => {
      sendWorkWithUsMail({ body: html, arquivo: file })
        .then((response) => {
          // Adiciona a pessoa
          if (alreadySent) {
            cookieObj.sent.push({
              name: data.name,
              email: data.email,
              whatsapp: data.whatsapp,
            });
          }

          // Setar cookie para evitar flod
          setCookie(
            undefined,
            "alreadySent",
            JSON.stringify(
              alreadySent
                ? cookieObj
                : {
                    sent: [
                      {
                        name: data.name,
                        email: data.email,
                        whatsapp: data.whatsapp,
                      },
                    ],
                  }
            ),
            {
              path: "/",
              maxAge: 24 * 60 * 60 * 1000, // 1 dias
            }
          );
          // Toastify Notification de sucesso
          toast.success(
            <div className="font-base w-max min-w-[300px]">
              <p>
                Obrigado por nos enviar seu currículo!
                <br />
                Até mais! 👋🏼
              </p>
              <p>Equipe REDUX Contabilidade</p>
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              className: "md:!-translate-x-8",
            }
          );

          // Limpa o form
          clearForm();
        })
        .catch((error: any) => {
          console.log(error);
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Limpa o form
          clearForm();
        });
    });
  }

  function onChangeCaptcha() {
    setCheckingCaptcha(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const token = recaptchaRef.current?.getValue()!;
    validateRecaptcha(token)
      .then((isTokenValid) => setCaptchaOk(isTokenValid))
      .finally(() => setCheckingCaptcha(false));
  }

  const errorMessageStyle = "text-red-500 font-bold text-sm";
  const labelStyle = "font-white font-semibold";
  // const placeHolderStyle = 'font-[#222020] font-bold placeholder:text-muted-foreground border border-gray-600'
  const placeHolderStyle =
    "font-[#222020] font-base placeholder:text-muted-foreground bg-gray-300/60 border border-gray-400/80";

  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Nome*</FormLabel>
              <FormMessage className={errorMessageStyle} />
              <FormControl>
                <Input
                  {...field}
                  id="name"
                  className={placeHolderStyle}
                  placeholder="Digite seu nome"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Email*</FormLabel>
              <FormMessage className={errorMessageStyle} />
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  className={cn(placeHolderStyle)}
                  placeholder="Informe seu email principal"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Whatsapp */}
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Whatsapp*</FormLabel>
              <FormMessage className={errorMessageStyle} />
              <FormControl>
                <InputMask
                  mask="(99) 9 9999-9999"
                  // value={field.value}
                  value={whatsappValue}
                  // onChange={field.onChange}
                  onChange={(e) => {
                    // Remove todos os caracteres não numéricos
                    const numericValue = e.target.value.replace(/\D/g, "");
                    // Formata o valor para a máscara
                    const formattedValue = numericValue.replace(
                      /(\d{2})(\d{1})(\d{4})(\d{4})/,
                      "($1) $2 $3-$4"
                    );
                    // Atualiza o estado local
                    setWhatsappValue(formattedValue);
                    // Atualiza o valor no react-hook-form
                    field.onChange(numericValue);
                  }}
                  maskChar=""
                >
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (field) => (
                      <Input
                        {...field}
                        id="whatsapp"
                        className={placeHolderStyle}
                        placeholder="Telefone para contato"
                      />
                    )
                  }
                </InputMask>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Cidade e Estado */}
        <div className="flex w-full items-center gap-8">
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className={labelStyle}>Cidade*</FormLabel>
                <FormMessage className={errorMessageStyle} />
                <FormControl>
                  <Input
                    {...field}
                    id="cidade"
                    className={placeHolderStyle}
                    placeholder="Onde você reside?"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem className="mt-2 flex flex-1 flex-col gap-1">
                <FormLabel className={labelStyle}>Estado*</FormLabel>
                <FormMessage className={errorMessageStyle} />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "h-9 w-full max-w-[200px] justify-between border border-gray-400/80 bg-gray-300/60",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? estadosDoBrasil.find(
                              (estado) => estado.UF === field.value
                            )?.name
                          : "Selecione o Estado"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command className="bg-gray-100">
                      <CommandInput placeholder="Informe seu estado..." />
                      <CommandEmpty>Estado não existe</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {estadosDoBrasil.map((estado) => (
                            <CommandItem
                              value={estado.name}
                              key={estado.UF}
                              onSelect={() => {
                                form.setValue("estado", estado.UF);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  estado.UF === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {estado.name}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="arquivo"
          render={({ field }) => (
            <FormItem className="my-3 flex flex-col">
              <FormLabel className={labelStyle}>Currículo*</FormLabel>
              <FormMessage className={errorMessageStyle} />
              <FormControl>
                <div className="z-[999] w-max min-w-[176px] max-w-[390px] cursor-pointer rounded-md border border-solid border-gray-400/80 bg-gray-300/60 p-1 px-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    id="arquivo"
                    style={{ display: "none" }} // Esconde o input padrão
                  />
                  <label
                    htmlFor="arquivo"
                    className="flex cursor-pointer items-center justify-center"
                  >
                    {file?.name || "Escolha um arquivo"}{" "}
                    {/* Exibe o nome do arquivo ou um texto padrão */}
                  </label>
                  {/* ...resto do seu componente */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Mensagem*</FormLabel>
              <FormMessage className={errorMessageStyle} />
              <FormControl className="max-h-[230px]">
                <Textarea
                  {...field}
                  id="message"
                  className={placeHolderStyle}
                  placeholder="Digite sua mensagem..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
          onChange={onChangeCaptcha}
          className="mt-4 self-start"
        />
        {isSending ? (
          <Button
            disabled
            type="submit"
            className="mt-4 w-1/3 place-self-center self-center !rounded-2xl bg-[#4EA929] text-lg font-bold text-white"
          >
            {/* Loading Spinner */}
            <div id="wrapper">
              <div className="profile-main-loader">
                <div className="loader">
                  <svg className="circular-loader" viewBox="25 25 50 50">
                    <circle
                      className="loader-path"
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke="#70c542"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
            Enviar
          </Button>
        ) : (
          <Button
            type="submit"
            className="mt-4 w-1/3 place-self-center self-center !rounded-2xl bg-[#4EA929] text-lg font-bold text-white"
          >
            Enviar
          </Button>
        )}

        {/* <Button type="submit" className="place-self-center self-center my-4 w-1/3 bg-primary-color text-white text-lg font-bold !rounded-2xl">Enviar</Button> */}
      </form>
    </Form>
  );
}
