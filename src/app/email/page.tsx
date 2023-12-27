import Email from "@/components/Email"
import { renderizar } from "@/components/Email/render"

export default function EmailPage() {
  const dataPerson = {
    cidade: 'Juazeiro',
    estado: 'CE',
    name: 'Fulano',
    email: 'XXXXXXXXXXXXXXXX',
    message: 'XXXXXXXXXXXXXXXX',
    whatsapp: 'XXXXXXXXXXXXXXXX',
  }

  const renderizarAqui = async (dataPerson: any) => {
    'use server'
    return await renderizar(dataPerson)
  }

  return (
    <>
      <p>{renderizarAqui(dataPerson)}</p>
      <div>
        <section>
          <Email {...dataPerson} />
        </section>
      </div>
    </>
  )
}
