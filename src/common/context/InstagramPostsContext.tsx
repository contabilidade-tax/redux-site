"use client"
import React, { createContext, useReducer, useContext, useLayoutEffect, Dispatch, useEffect } from 'react';
import { InstaPostData, InstaTokenData, InstaPostsProps } from '@/types';
import axios from 'axios';

const initialState = {
    data: [] as InstaPostData[],
    token: {} as InstaTokenData
};
type ActionType = {
    type: string;
    value: InstaPostData[] | InstaTokenData;
};
type InstaPostsContextValue = {
    state: typeof initialState | null;
    fetchToken: () => Promise<any>;
    fetchData: (token: InstaTokenData) => Promise<any>;
}
const InstaPostsContext = createContext<InstaPostsContextValue | undefined>(undefined);


async function renewToken(old_token: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${old_token}`;
        const response = await axios.get(url);

        const responseDataWithTimestamp = {
            ...response.data,
            generated_at: Date.now().toString()
        };
        console.log(responseDataWithTimestamp);
        return responseDataWithTimestamp; // Retorna os dados do novo token com generated_at

    } catch (error: any) {
        console.error('Erro ao renovar o token:', error.message);
        throw error; // Relança o erro para um tratamento adicional, se necessário
    }
}


function reducer(state: any, action: ActionType) {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.value,
            }
        case 'UPDATE_POSTS_DATA':
            return {
                ...state,
                data: action.value,
            }
        default:
            return state;
    }
}

export const useInstaPostsContext = () => {
    const context = useContext(InstaPostsContext);
    if (!context) {
        throw new Error('useInstaPostsContext must be used within a InstaPostsContextProvider');
    }
    return context;
};

async function getTokenData(): Promise<InstaTokenData | null> {
    try {
        const response = await axios.get(`/api/instaData?key=token`);
        return response.data.data;
    } catch (error: any) {
        console.error("Erro ao buscar token:", error.message);
        return null; // Ou outra lógica de tratamento de erro
    }
}


async function getRedisData() {
    try {
        const response = await axios.get(`/api/instaData`);

        // O Axios automaticamente trata a resposta como JSON,
        // então não é necessário chamar response.json()
        return response.data.data;

    } catch (error: any) {
        console.error(error);

        // Verifica se o erro é específico para a situação 'cacheado'
        if (error.message.includes('cacheado')) {
            return false;
        }

        // Trate outros erros ou retorne um valor padrão aqui
        return null;
    }
}


function setTokenData(data: InstaTokenData): InstaTokenData | undefined | never | any {
    // const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL
    fetch(`/api/createInstaData?key=token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    }).then(
        resultado => {
            const responseData = resultado.json();
            return responseData;
        }
    ).catch(
        error => {
            console.log(`HTTP error! status: ${error.message}`);
        }
    )
}

async function setPostsData(data: InstaPostData[]) {
    try {
        const response = await axios.post('/api/createInstaData', { data }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

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


function updateTokenData(token: InstaTokenData, dispatch: Dispatch<ActionType>) {
    const newToken = setTokenData(token);
    dispatch({
        type: 'UPDATE_TOKEN',
        value: newToken,
    });

    return newToken
}

async function getPostsData(token: InstaTokenData, dispatch: any) {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_IG_URL}/me/media`;
        let allData: any = [];

        for (let i = 0; i === 0; i++) { // Limite de 1 requisições
            if (!url) break; // Se não houver mais URLs para buscar, interrompe o loop

            const response = await axios.get(url, {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,timestamp',
                    access_token: token.access_token,
                },
            });
            // Juntar os dados de cada requisição
            if (response.data && response.data.data) {
                allData = [...allData, ...response.data.data];
            }

            // Atualiza a URL para a próxima página, se existir
            url = response.data.paging && response.data.paging.next ? response.data.paging.next : null;
        }

        // Após o loop, atualizar o estado com os dados acumulados
        dispatch({
            type: 'UPDATE_POSTS_DATA',
            value: allData,
        });
        // Criar o cache com os dados e salvar no banco
        await setPostsData(allData)

    } catch (error: any) {
        console.log('Erro ao buscar os posts:', error.message, error.response?.data);
        return null
    }
}


export function InstaPostsContextProvider({ children }: InstaPostsProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async (token: InstaTokenData) => {
        const cache = await getRedisData()
        const dbData = await getPostsData(token, dispatch)

        if (cache) {
            dispatch({
                type: 'UPDATE_POSTS_DATA',
                value: cache,
            });
            return cache
        }
        // Pega da API ou do Banco 
        if (dbData) {
            dispatch({
                type: 'UPDATE_POSTS_DATA',
                value: dbData,
            });
            return dbData
        }
    };

    const fetchToken = async () => {
        if (!state.token || Object.keys(state.token).length === 0) {
            // Lógica para buscar e atualizar o token
            const fetchedToken = await getTokenData()

            if (fetchedToken) {
                const token = fetchedToken
                dispatch({
                    type: 'UPDATE_TOKEN',
                    value: token,
                })

                if (Date.now() >= (token.generated_at! + token.expires_in! * 1000)) {
                    try {
                        const newTokenData = await renewToken(token.access_token!);
                        const actualTimestampTokenData = {
                            ...newTokenData,
                            generated_at: Date.now(),
                        };

                        updateTokenData(actualTimestampTokenData, dispatch);

                    } catch (error) {
                        console.log('Erro ao renovar o token:', error);
                    }
                }

                return token
            }
        }
    };

    return (
        <InstaPostsContext.Provider value={{ state, fetchToken, fetchData }}>
            {children}
        </InstaPostsContext.Provider>
    );
}

// export async function getServerSideProps(context: any) {
//     try {
//         const tokenData = await getTokenData();
//         const postsData = await getRedisData();

//         return { props: { tokenData, postsData } };
//     } catch (error) {
//         console.error("Erro em getServerSideProps:", error);
//         // Retorna null para ambos os props em caso de erro
//         return { props: { tokenData: null, postsData: null } };
//     }
// }
