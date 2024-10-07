'use server'
import sendgrid from '@sendgrid/mail'

async function sendWorkWithUsMail(data: { body: string, arquivo: any }) {
    try {
        const client = sendgrid;
        client.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);
        const options = {
            personalizations: [
                {
                    from: { email: 'programacao@contabilidade-tax.com.br', name: 'Setor de Programação' },
                    to: [
                        {
                            email: 'rh@contabilidade-tax.com.br',
                            name: 'Setor de RH'
                        },
                    ]
                }
            ],
            from: { email: 'programacao@contabilidade-tax.com.br', name: 'Setor de Programação' },
            replyTo: { email: 'protocolo@contabilidade-tax.com.br', name: 'Protocolos' },
            subject: 'Novo currículo recebido',
            html: data.body,
            attachments: [
                {
                    content: data.arquivo.file,
                    filename: data.arquivo.name,
                    type: data.arquivo.type,
                    disposition: 'attachment'
                }
            ]
        }

        const emailResponse = await client.send(options)
        return emailResponse
    } catch (error: any) {
        console.error(error.message)
        throw error
    }
}

export { sendWorkWithUsMail }