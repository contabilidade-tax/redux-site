import { redirect } from "next/navigation";

export default function Servicos() {
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Bom dia";
    } else if (hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  }

  console.log(`https://wa.me/send?phone=5588999660188&text=${encodeURIComponent(`Ola ${getGreeting()}, gostaria de saber mais sobre seus serviços`)}`)

  return redirect(`https://wa.me/send?phone=5588999660188&text=${encodeURIComponent(`Ola ${getGreeting()}, gostaria de saber mais sobre seus serviços`)}`)
}
