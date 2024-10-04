"use client";
import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { InstaPostData, InstaTokenData, InstaPostsProps } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import crypto from "crypto";
import { StringValidation } from "zod";

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
  fetchData: () => Promise<InstaPostData[]>;
  updateState: () => Promise<InstaPostData[]>;
};
const InstaPostsContext = createContext<InstaPostsContextValue | undefined>(
  undefined
);

async function renewToken(expiredToken: string) {
  const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;
  const iv = process.env.NEXT_PUBLIC_CRYPTO_IV;
  const authorization = process.env.NEXT_PUBLIC_BEARER_TOKEN;
  //
  const api_base = "https://api.instagram.com/oauth/authorize";
  const appId = process.env.NEXT_PUBLIC_API_IG_APP_ID;
  const scope = "user_profile,user_media";
  const redirectUri = `/api/instaData/authorize/${encodeURIComponent(
    criptografar(authorization, key, iv)
  )}/`;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${expiredToken}`;
    const response = await axios.get(url);
    const responseDataWithTimestamp = {
      ...response.data,
      generated_at: Date.now(),
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

async function getAlreadySavedToken(): Promise<InstaTokenData | null> {
  try {
    const response = await axios.get(`/api/instaData?key=token`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Erro ao buscar token:", error.message);
    return null;
  }
}

async function getRedisData() {
  try {
    const response = await axios.get(`/api/instaData`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    });

    // O Axios automaticamente trata a resposta como JSON,
    // então não é necessário chamar response.json()
    return response.data.data;
  } catch (error: any) {
    console.error(error);

    // Verifica se o erro é específico para a situação 'cacheado'
    if (error.message.includes("cacheado")) {
      return false;
    }

    // Trate outros erros ou retorne um valor padrão aqui
    return null;
  }
}

function setTokenData(
  data: InstaTokenData
): InstaTokenData | undefined | never | any {
  axios
    .post(`/api/createInstaData?key=token`, JSON.stringify({ data }), {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(`HTTP error! status: ${error.message}`);
    });
}

async function setPostsData(data: InstaPostData[]) {
  try {
    const response = await axios.post(
      "/api/createInstaData",
      { data },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Retorna os dados da resposta
    return response.data;
  } catch (error: any) {
    // Log do erro e possível re-lançamento ou tratamento
    console.error(`Erro ao enviar dados: ${error.message}`);
    if (error.response) {
      console.error(`Detalhes do erro: ${JSON.stringify(error.response.data)}`);
    }
    throw error; // Relançar o erro ou retornar um valor padrão
  }
}

async function getPostsDataFromIGApi(
  token: InstaTokenData
): Promise<InstaPostData[] | null> {
  try {
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

    await setPostsData(allData);
    return allData;
  } catch (error: any) {
    console.log(
      "Erro ao buscar os posts:",
      error.message,
      error.response?.data
    );
    return null;
  }
}

async function getPostsDataFromDbLocalCopy() {
  try {
    const response = await axios.get(`/api/instaData/db`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export function InstaPostsContextProvider({ children }: InstaPostsProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (): Promise<InstaPostData[]> => {
    try {
      const token = await fetchOrUpdateFBAcessToken();
      const cache = await getRedisData();

      if (cache) {
        dispatch({ type: "UPDATE_POSTS_DATA", value: cache });
        return cache;
      }

      const apiIGData = await getPostsDataFromIGApi(token!);
      if (apiIGData) {
        dispatch({ type: "UPDATE_POSTS_DATA", value: apiIGData });
        return apiIGData;
      }

      const data = await getPostsDataFromDbLocalCopy();
      dispatch({ type: "UPDATE_POSTS_DATA", value: data });
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw new Error("Token não recebido");
    }
  };

  async function fetchOrUpdateFBAcessToken(): Promise<
    InstaTokenData | undefined
  > {
    const savedToken = await getAlreadySavedToken();

    if (savedToken) {
      if (
        Date.now() >=
        savedToken.generated_at + savedToken.expires_in * 1000
      ) {
        const newTokenData = await renewToken(savedToken.access_token);
        const newToken = setTokenData(newTokenData);
        dispatch({
          type: "UPDATE_TOKEN",
          value: newToken,
        });

        return newToken;
      }

      return savedToken;
    }
  }

  async function updatePostsState() {
    const data = await fetchData();
    return data;
  }

  return (
    <InstaPostsContext.Provider
      value={{ state, fetchData, updateState: updatePostsState }}
    >
      {children}
    </InstaPostsContext.Provider>
  );
}
