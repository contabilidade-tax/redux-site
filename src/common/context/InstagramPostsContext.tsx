"use client";
import React, { createContext, useReducer, useContext } from "react";
import { InstaPostData, InstaTokenData, InstaPostsProps } from "@/types";
import axios from "axios";
import crypto from "crypto";
import {
  getTokenDataOnDb,
  setTokenDataOnDb,
} from "../actions/ig/igTokenManager";
import {
  getCachedProfilePostsData,
  updateOrCreatePostsDataOnDb,
  getProfilePostsDataOnDb,
} from "../actions/ig/igProfilePostsManager";
import { Prisma } from "@prisma/client";

function criptografar(texto: any, chave: any, iv: any) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(chave, "hex"),
    Buffer.from(iv, "hex")
  );
  let textoCriptografado = cipher.update(texto);
  textoCriptografado = Buffer.concat([textoCriptografado, cipher.final()]);
  return iv.toString("hex") + ":" + textoCriptografado.toString("hex");
}

const initialState = {
  data: [] as InstaPostData[],
  // token: {} as InstaTokenData
};
type ActionType = {
  type: string;
  value: InstaPostData[] | InstaTokenData;
};
type InstaPostsContextValue = {
  state: typeof initialState | null;
  fetchPostsData: () => Promise<InstaPostData[]>;
  updatePostsState: () => Promise<InstaPostData[]>;
};
const InstaPostsContext = createContext<InstaPostsContextValue | undefined>(
  undefined
);

function reducer(state: any, action: ActionType) {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.value,
      };
    case "UPDATE_POSTS_DATA":
      return {
        ...state,
        data: action.value,
      };
    default:
      return state;
  }
}

export const useInstaPostsContext = () => {
  const context = useContext(InstaPostsContext);
  if (!context) {
    throw new Error(
      "useInstaPostsContext must be used within a InstaPostsContextProvider"
    );
  }
  return context;
};

async function renewToken(expiredToken: string) {
  // const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;
  // const iv = process.env.NEXT_PUBLIC_CRYPTO_IV;
  // const authorization = process.env.NEXT_PUBLIC_BEARER_TOKEN;
  //
  // const api_base = "https://api.instagram.com/oauth/authorize";
  // const appId = process.env.NEXT_PUBLIC_API_IG_APP_ID;
  // const scope = "user_profile,user_media";
  // const redirectUri = `/api/instaData/authorize/${encodeURIComponent(
  //   criptografar(authorization, key, iv)
  // )}/`;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${expiredToken}`;
    const response = await axios.get(url);
    const responseDataWithTimestamp = {
      ...response.data,
      generated_at: Date.now().toString(),
    };

    return responseDataWithTimestamp;
  } catch (error: any) {
    console.error("Erro ao renovar o token:", error.message);
    // Se code 190 pega um novo
    // GAMBIARRA BRABA MAS FUNCIONA
    // SE NÃO FOR POSSÍVEL RENOVAR AUTOMATICAMENTE FORÇA À RELOGAR COM O INSTA
    // if (error.response.data.error.code === 190) {
    //   router.replace(
    //     `${api_base}?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
    //   );
    // }
  }
}

// async function getAlreadySavedToken(): Promise<InstaTokenData | null> {
//   try {
//     const response = await axios.get(`/api/instaData?key=token`, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
//       },
//     });
//     return response.data.data;
//   } catch (error: any) {
//     console.error("Erro ao buscar token:", error.message);
//     return null;
//   }
// }

// async function getRedisData() {
//   try {
//     const response = await axios.get(`/api/instaData`, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
//       },
//     });

//     // O Axios automaticamente trata a resposta como JSON,
//     // então não é necessário chamar response.json()
//     return response.data.data;
//   } catch (error: any) {
//     console.error(error);

//     // Verifica se o erro é específico para a situação 'cacheado'
//     if (error.message.includes("cacheado")) {
//       return false;
//     }

//     // Trate outros erros ou retorne um valor padrão aqui
//     return null;
//   }
// }

// function setTokenData(
//   token: InstaTokenData
// ): InstaTokenData | undefined | never | any {
//   console.log(
//     "ENCONTREI O B.O, NÃO TO RECEBENDO O TOKEN PRA SETAR NO CACHE",
//     token
//   );
//   axios
//     .post(
//       `/api/createInstaData?key=token`,
//       { ...token },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((res) => {
//       return token;
//     })
//     .catch((error) => {
//       console.log(`HTTP error! status: ${error.message}`);
//       throw error;
//     });
// }

// async function setPostsData(data: InstaPostData[]) {
//   try {
//     const response = await axios.post(
//       "/api/createInstaData",
//       { data },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Retorna os dados da resposta
//     return response.data;
//   } catch (error: any) {
//     // Log do erro e possível re-lançamento ou tratamento
//     console.error(`Erro ao enviar dados: ${error.message}`);
//     if (error.response) {
//       console.error(`Detalhes do erro: ${JSON.stringify(error.response.data)}`);
//     }
//     throw error; // Relançar o erro ou retornar um valor padrão
//   }
// }

async function getPostsDataFromIGApi(
  token: InstaTokenData
): Promise<InstaPostData[] | null> {
  try {
    console.log("Tentando buscar os posts", "TOKEN", token);
    let url = `${process.env.NEXT_PUBLIC_API_IG_URL}/me/media`;
    let allData: InstaPostData[] = [];

    for (let i = 0; i === 0; i++) {
      if (!url) break; // Se não houver mais URLs para buscar, interrompe o loop

      const response = await axios.get(url, {
        params: {
          fields:
            "id,caption,media_type,media_url,permalink,timestamp,username",
          access_token: token.access_token,
        },
      });

      if (response.data && response.data.data) {
        allData = [...allData, ...response.data.data];
      }

      url = response.data.paging?.next || null;
    }

    return allData;
  } catch (error: any) {
    console.log(
      "Erro ao buscar os posts da API INSTA:",
      `Message: ${error.message}`,
      `Response: ${error.response?.data}`
    );
    return null;
  }
}

// async function getPostsDataFromDbLocalCopy() {
//   try {
//     const response = await axios.get(`/api/instaData/db`, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
//       },
//     });

//     return response.data.data;
//   } catch (error: any) {
//     console.error(error);
//     return null;
//   }
// }

export function InstaPostsContextProvider({ children }: InstaPostsProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchPostsData(): Promise<InstaPostData[]> {
    console.log("FETCH DATA INICIO");
    const token = await fetchOrUpdateFBAcessToken();
    // const cache = await getRedisData();
    const cache = await getCachedProfilePostsData();
    if (cache) {
      console.log("ACEITAS CACHE?", cache);
      dispatch({ type: "UPDATE_POSTS_DATA", value: cache });
      return cache;
    }

    const apiIGData = await getPostsDataFromIGApi(token!);
    console.log("SEM CACHE, VAMO DIRETO PRO IG MESMO", `TOKEN:${token}`);
    if (apiIGData) {
      await updateOrCreatePostsDataOnDb(apiIGData);
      dispatch({ type: "UPDATE_POSTS_DATA", value: apiIGData });
      return apiIGData;
    }

    console.error("Erro ao buscar dados:", "Indo Pra cópia local mesmo");
    // const data = await getPostsDataFromDbLocalCopy();
    const data = await getProfilePostsDataOnDb();
    dispatch({ type: "UPDATE_POSTS_DATA", value: data });
    return data;
  }

  async function fetchOrUpdateFBAcessToken(): Promise<
    InstaTokenData | undefined
  > {
    console.log("TOKEN INICIO");
    // const savedToken = await getAlreadySavedToken();
    const savedToken = await getTokenDataOnDb();

    if (savedToken) {
      if (
        Date.now() >=
        Number(savedToken.generated_at) + Number(savedToken.expires_in) * 1000
      ) {
        const newTokenData = await renewToken(savedToken.access_token);
        // const newToken = setTokenData(newTokenData);
        const newToken = await setTokenDataOnDb(newTokenData);
        dispatch({
          type: "UPDATE_TOKEN",
          value: newToken,
        });

        console.log("TOKEN FIM, ATUALIZADO", newToken);
        return newToken;
      }
      console.log("TOKEN FIM", savedToken);

      return savedToken;
    }
  }

  async function updatePostsState() {
    const data = await fetchPostsData();
    return data;
  }

  return (
    <InstaPostsContext.Provider
      value={{
        state,
        fetchPostsData,
        updatePostsState,
      }}
    >
      {children}
    </InstaPostsContext.Provider>
  );
}
