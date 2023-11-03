'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import * as z from 'zod'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import InputMask from 'react-input-mask';
import estados from '@/common/data/estadosBrasil.json'
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const formSchema: any = z.object({
    name: z.string().min(2, {
        message: "Nome precisa ter no mínimo 2 caracteres",
    }),
    email: z.string().email({
        message: "Email não é válido",
    }),
    whatsapp: z.string().min(11, {
        message: "WhatsApp precisa ter no mínimo 11 dígitos no formato (99) 99999-9999",
    })
        .regex(/^[0-9]+$/, {
            message: "Forneça apenas números, não letras!",
        })
        .regex(/^\d{11}$/, {
            message: "WhatsApp não está no formato correto (99) 99999-9999",
        }),
    cidade: z.string().toLowerCase().refine((value) => value.trim() !== '', {
        message: "Informe sua cidade",
    }),
    message: z.string().max(255, {
        message: "Mensagem demasiado longa",
    }).refine((value) => value.trim() !== '', {
        message: "Mensagem não pode estar em branco",
    }),
    estado: z.string({
        required_error: "UF não pode estar em branco",
    }).length(2, {
        message: "UF precisa ter 2 dígitos",
    })
})

export default function ContactForm({ className }: { className?: string }) {
    const [whatsappValue, setWhatsappValue] = useState('');
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            whatsapp: "",
            cidade: "",
            message: "",
            estado: "CE",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: "Você enviou os seguintes valores:",
            className: "mt-2 rounded-md bg-slate-800 p-4 text-white",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-800 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const errorMessageStyle = 'text-red-500 font-bold text-sm'
    const labelStyle = 'font-white font-bold'
    const placeHolderStyle = 'font-[#222020] font-bold placeholder:text-muted-foreground'

    return (
        <Form {...form}>
            <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelStyle}>Nome</FormLabel>
                        <FormMessage className={errorMessageStyle} />
                        <FormControl>
                            <Input {...field} id="name" className={placeHolderStyle} placeholder="Digite seu nome" />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelStyle}>Email</FormLabel>
                        <FormMessage className={errorMessageStyle} />
                        <FormControl>
                            <Input {...field} id="email" placeholder="Informe seu email principal" />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="whatsapp" render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelStyle}>Whatsapp</FormLabel>
                        <FormMessage className={errorMessageStyle} />
                        <FormControl>
                            <InputMask
                                mask="(99) 9 9999-9999"
                                // value={field.value}
                                value={whatsappValue}
                                // onChange={field.onChange}
                                onChange={
                                    (e) => {
                                        // Remove todos os caracteres não numéricos
                                        const numericValue = e.target.value.replace(/\D/g, '');
                                        // Formata o valor para a máscara
                                        const formattedValue =
                                            numericValue.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
                                        // Atualiza o estado local
                                        setWhatsappValue(formattedValue);
                                        // Atualiza o valor no react-hook-form
                                        field.onChange(numericValue);
                                    }
                                }
                                maskChar=""
                            >
                                {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    (field) => (
                                        <Input {...field} id="whatsapp" placeholder="Telefone para contato" />
                                    )
                                }
                            </InputMask>
                        </FormControl>
                    </FormItem>
                )} />
                <div className="flex items-center w-full gap-8">
                    <FormField control={form.control} name="cidade" render={({ field }) => (
                        <FormItem>
                            <FormLabel className={labelStyle}>Cidade</FormLabel>
                            <FormMessage className={errorMessageStyle} />
                            <FormControl>
                                <Input {...field} id="cidade" placeholder="Onde você reside?" />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="estado" render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 mt-2">
                            <FormLabel className={labelStyle}>Estado</FormLabel>
                            <FormMessage className={errorMessageStyle} />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] h-9 justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? estados.states.find(
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
                                                {estados.states.map((estado) => (
                                                    <CommandItem
                                                        value={estado.name}
                                                        key={estado.UF}
                                                        onSelect={() => {
                                                            form.setValue("estado", estado.UF)
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
                    )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelStyle}>Mensagem</FormLabel>
                        <FormMessage className={errorMessageStyle} />
                        <FormControl className="max-h-[230px]">
                            <Textarea {...field} id="message" placeholder="Digite sua mensagem..." />
                        </FormControl>
                    </FormItem>
                )} />
                <Button type="submit" className="self-center my-4 w-1/3 bg-white text-black font-bold !rounded-2xl">Enviar</Button>
            </form>
        </Form>
    )
}