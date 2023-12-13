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
}
const InstaPostsContext = createContext<InstaPostsContextValue | undefined>(undefined);


async function renewToken(old_token: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${old_token}`);

        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

        const data = await response.json();

        // Adicionando o campo generated_at à resposta
        const responseDataWithTimestamp = {
            ...data,
            generated_at: Date.now().toString()
        };
        console.log(responseDataWithTimestamp)
        return responseDataWithTimestamp; // Retorna os dados do novo token com generated_at

    } catch (error: any) {
        console.log('Erro ao renovar o token:', error.message);
        throw error;
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
    // const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL
    try {
        const response = await fetch(`/api/instaData?key=token`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Erro HTTP: status ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log("não encontrado", error);
        return null; // Ou como você deseja tratar o erro
    }
}


async function getRedisData() {
    // const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL;

    try {
        const response = await fetch(`/api/instaData`, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`Erro HTTP: status ${response.status}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error: any) {
        console.log(error);
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

function setPostsData(data: InstaPostData[]) {
    axios.post('/api/createInstaData', { data }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            const responseData = response.data;

            // Aqui você pode fazer o que precisa com responseData
            // Por exemplo, salvar no localStorage ou atualizar o estado

            return responseData;
        })
        .catch((error) => {
            console.error(`Erro ao enviar dados: ${error.message} - ${error.response.data}`);
        });
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
        let url = `${process.env.NEXT_PUBLIC_API_IG_URL} / me / media`;
        let allData: any = [];

        for (let i = 0; i === 0; i++) { // Limite de 1 requisições
            if (!url) break; // Se não houver mais URLs para buscar, interrompe o loop
            console.log("TOKEN NO FOR", token)
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
        // Criar o cache com os dados
        setPostsData(allData)

    } catch (error: any) {
        console.log('Erro ao buscar os posts:', error.message);
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
        } else if (dbData) {
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

    useEffect(() => {
        fetchToken().then(token => fetchData(token!).then())

    }, []);

    return (
        <InstaPostsContext.Provider value={{ state }}>
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
