import ContactForm from "./Form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
};

export default function TrabalheConosco() {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN}/assets/img/bg/dinoTrabalheConoscoNatal.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundPositionY: "80%",
      }}
      className="flex min-h-[100svh] w-full flex-1 items-center justify-center p-6"
    >
      <ContactForm className="z-50 mt-[10svh] flex max-h-[52rem] flex-col rounded-2xl border-2 border-gray-400 bg-[#fff] p-6 drop-shadow-custom md:!min-w-[30rem] xsm:min-w-[50%]" />
    </div>
  );
}
