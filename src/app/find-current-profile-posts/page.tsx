"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./styles.scss";
import { Instagram } from "lucide-react";
import { fetchPostsData } from "@/components/InstaRecentPosts/actions/fetchOrUpdatePosts";

export default function Core() {
  const router = useRouter();

  useEffect(() => {
    // Atualiza o estado e, em seguida, redireciona após a atualização
    fetchPostsData().then(() => {
      // Use router.push para navegar programaticamente após a atualização do estado
      router.push("/?welcome=1&noRefresh=1");
    });
  }, [router]);

  // O componente não deve renderizar nada que vá para o output,
  // pois o objetivo é apenas redirecionar após a atualização do estado.
  return (
    <section className="relative my-auto flex h-full w-full flex-col items-center justify-center">
      <div className="container">
        <div className="folder">
          {/* <div className="top"></div>
                    <div className="bottom"></div> */}
          <Instagram width={100} height={100} color="black" />
        </div>
        <div className="title text-2xl font-bold">getting posts ready...</div>
      </div>
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </section>
  );
}
