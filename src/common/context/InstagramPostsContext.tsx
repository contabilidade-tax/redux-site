"use client"
import React, { createContext, useReducer, useContext, ReactNode, useLayoutEffect, useEffect, Dispatch } from 'react';
import { InstaPostData, InstaTokenData } from '@/types';
import axios from 'axios';

const initialState = {
    data: null,
    token: {
        access_token: "IGQWROWXowcm1qalpkYm5lbmJqQzM0ZA3VYdlhxekdKaVhvLWJZARDVYOGNiM1ZAESXdYWGdUYkhCdkZAMdnlVTFlxX2VKc2JGX1MxSk9WWXJXNXBnSmJfbHVOc0lnWlZA1ZATN1cVJoSUh2c1pzUQZDZD",
        token_type: "bearer",
        expires_in: 5182660,
        generated_at: 1696008201887
    }
};
type ActionType = {
    type: string;
    value: InstaPostData[] | InstaTokenData;
};
type InstaPostsContextValue = {
    state: InstaPostData | null;
}


const InstaPostsContext = createContext<InstaPostsContextValue | undefined>(undefined);


async function renewToken(old_token: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${old_token}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Adicionando o campo generated_at à resposta
        const responseDataWithTimestamp = {
            ...data,
            generated_at: Date.now()
        };
        return responseDataWithTimestamp; // Retorna os dados do novo token com generated_at

    } catch (error) {
        console.error('Erro ao renovar o token:', error);
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

function getTokenData() {
    const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL
    let data: InstaTokenData | undefined | never | any;
    fetch(`${home}/api/instaData?key=token`, {
        method: 'GET',
        cache: 'force-cache',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(resultado => {
            data = resultado.json();
        })
        .catch(error => {
            if (error.message.includes('No cached data')) {
                return false;
            }
        })
    return data;
}

function getRedisData() {
    const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL
    let data: InstaPostData | undefined | never | any;
    fetch(`${home}/api/instaData`, {
        method: 'GET',
        cache: 'force-cache',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(resultado => {
            data = resultado.json();
        }).catch(error => {
            if (error.message.includes('No cached data')) {
                return false;
            }
        })
    return data;
}

function setTokenData(data: InstaTokenData): InstaTokenData | undefined | never | any {
    const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL
    fetch(`${home}/api/createInstaData?key=token`, {
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
            console.error(`HTTP error! status: ${error.message}`);
        }
    )
}

function setRedisData(data: InstaPostData[]) {
    const home = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_VERCEL_API_URL
    fetch(`${home}/api/createInstaData`, {
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
            console.error(`HTTP error! status: ${error.message}`);
        }
    )
}

function updateTokenData(token: InstaTokenData, dispatch: Dispatch<ActionType>) {
    const newToken = setTokenData(token);
    dispatch({
        type: 'UPDATE_TOKEN',
        value: newToken,
    });

    return newToken
}

export function InstaPostsContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const cached_token = getTokenData()
    const cached_data = getRedisData()

    useLayoutEffect(() => {
        const fetchToken = async () => {
            if (!cached_token) {
                updateTokenData(state.token, dispatch)
            } else {
                return cached_token
            }
        }
        const fetchData = async () => {
            if (!cached_data) {
                const tokenData = state.token;

                if (Date.now() >= (tokenData.generated_at + tokenData.expires_in * 1000)) {
                    try {
                        const newTokenData = await renewToken(tokenData.access_token);
                        const actualTimestampTokenData = {
                            ...newTokenData,
                            generated_at: Date.now(),
                        };

                        updateTokenData(actualTimestampTokenData, dispatch);

                    } catch (error) {
                        console.error('Erro ao renovar o token:', error);
                        // Lide com o erro conforme necessário, por exemplo, configurando um estado de erro
                    }
                }

                try {
                    let url = `${process.env.NEXT_PUBLIC_API_IG_URL}/me/media`;
                    let allData: any = [];

                    for (let i = 0; i <= 1; i++) { // Limite de 1 requisições
                        if (!url) break; // Se não houver mais URLs para buscar, interrompe o loop

                        const response = await axios.get(url, {
                            params: {
                                fields: 'id,caption,media_type,media_url,permalink,timestamp',
                                access_token: tokenData.access_token,
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
                    // Criar o cookie com os dados
                    setRedisData(allData)
                } catch (error: any) {
                    console.error('Erro ao buscar os posts:', error.message);
                    // Lide com o erro conforme necessário
                }
            }
        };

        fetchToken()
        fetchData() // Chama a função assíncrona definida
    }, []);

    return (
        <InstaPostsContext.Provider value={{ state }}>
            {children}
        </InstaPostsContext.Provider>
    );
}
