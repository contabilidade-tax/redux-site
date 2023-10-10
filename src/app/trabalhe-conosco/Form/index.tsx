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


import estados from '@/common/data/estadosBrasil.json'
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import { CaretSortIcon } from "@radix-ui/react-icons"

const formSchema: any = z.object({
    name: z.string().min(2, {
        message: "Nome precisa ter no mínimo 2 caracteres",
    }),
    email: z.string().email({
        message: "Email não é válido",
    }),
    whatsapp: z.string().min(11, {
        message: "WhatsApp precisa ter no mínimo 11 dígitos no formato 99999999999",
    }).regex(/^\d{11}$/, {
        message: "WhatsApp não está no formato correto 99999999999",
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
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-800 p-4">
                    <code className="text-black">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const errorMessageStyle = 'text-red-500 font-bold text-sm'

    return (
        <Form {...form}>
            <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input {...field} id="name" placeholder="Digite seu nome" />
                        </FormControl>
                        <FormMessage className={errorMessageStyle} />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} id="email" placeholder="Informe seu email principal" />
                        </FormControl>
                        <FormMessage className={errorMessageStyle} />
                    </FormItem>
                )} />
                <FormField control={form.control} name="whatsapp" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Whatsapp</FormLabel>
                        <FormControl>
                            <Input {...field} id="whatsapp" placeholder="Telefone para contato" />
                        </FormControl>
                        <FormMessage className={errorMessageStyle} />
                    </FormItem>
                )} />
                <div className="flex items-center w-full gap-8">
                    <FormField control={form.control} name="cidade" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                                <Input {...field} id="cidade" placeholder="Onde você reside?" />
                            </FormControl>
                            <FormMessage className={errorMessageStyle} />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="estado" render={({ field }) => (
                        <FormItem className="flex flex-col gap-1 mt-2">
                            <FormLabel>Estado</FormLabel>
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
                            <FormMessage className={errorMessageStyle} />
                        </FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                            <Textarea {...field} id="message" placeholder="Digite sua mensagem..." />
                        </FormControl>
                        <FormMessage className={errorMessageStyle} />
                    </FormItem>
                )} />
                <Button type="submit" className="mt-8 bg-black text-gray-300 font-bold">Enviar</Button>
            </form>
        </Form>
    )
}