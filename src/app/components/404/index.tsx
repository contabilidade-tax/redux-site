import './404.scss'

export const metadata = {
  title: 'Nada por aqui',
}

export default function Page404() {
  return (
    <section className="absolute top-1/2 h-screen w-full -translate-y-1/2  overflow-auto bg-slate-200">
      <div className="container">
        <div className="error404page">
          <div className="newcharacter404">
            <div className="chair404"></div>
            <div className="leftshoe404"></div>
            <div className="rightshoe404"></div>
            <div className="legs404"></div>
            <div className="torso404">
              <div className="body404"></div>
              <div className="leftarm404"></div>
              <div className="rightarm404"></div>
              <div className="head404">
                <div className="eyes404"></div>
              </div>
            </div>
            <div className="laptop404"></div>
          </div>
        </div>
        <div className="relative top-40 text-6xl font-extrabold">
          <h1>Página não encontrada :(</h1>
        </div>
      </div>
    </section>
  )
}
