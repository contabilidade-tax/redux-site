import Image from 'next/image'

export default function Home() {
  return (
    <main className="z-20 flex h-full w-full flex-1 justify-center pt-28">
      <section className="left-area  w-2/3 px-24">
        <div className="home-text w-6/6 text-7xl leading-tight">
          <h1 className="w-full font-extrabold">
            + de 126 milhõe
            <span className="yellow-painting text-6xl">$</span>
          </h1>
          <h1 className="w-full text-5xl">Administrados em 2022</h1>
          <h1 className="w-full font-extrabold">+ de 250</h1>
          <h1 className="w-full text-5xl">clientes em todo o brasil e fora</h1>
        </div>
        <div className="flex flex-col">
          <div className="m-5 flex w-full items-center gap-3">
            <Image
              src="/assets/img/brasil.png"
              alt="brasil"
              width={100}
              height={100}
            />
            <Image
              src="/assets/img/franca.png"
              alt="franca"
              width={100}
              height={100}
            />
            <Image
              src="/assets/img/usa.png"
              alt="usa"
              width={100}
              height={100}
            />
          </div>
          <button className="mt-4 h-10 w-80 rounded-2xl bg-black p-2 font-semibold text-zinc-100">
            Salva minha empresa! 😢
          </button>
        </div>
      </section>
      <section className="right-area h-1/4 w-1/2 overflow-auto">
        <Image
          className="big-image-isaac scale-80 absolute -right-3 top-48"
          src="/assets/img/dino-sprite.avif"
          alt="Neto-image-big"
          width={400}
          height={400}
        />
        <div className="yellow-badge z-10 w-32">
          <Image
            className="yellow-badge-img"
            src="/assets/img/isaac-bw.png"
            alt="neto-bw"
            width={400}
            height={400}
          />
        </div>
      </section>
    </main>
  )
}
