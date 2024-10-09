'use server'
import {
    getCachedProfilePostsData,
    getProfilePostsDataOnLocalCopy,
    createOrUpdatePostsDataLocalCopy,
    getPostsDataFromIGApi
} from "@/common/actions/ig/igProfilePostsManager";
import { getTokenDataOnDb, renewToken, setTokenDataOnDb } from "@/common/actions/ig/igTokenManager";
import { InstaPostData, InstaTokenData } from "@/types";

async function fetchPostsData(): Promise<InstaPostData[]> {
    const token = await fetchOrUpdateFBAcessToken();
    const cache = await getCachedProfilePostsData();

    if (token) {
        if (cache) {
            return cache;
        }

        const apiIGData = await getPostsDataFromIGApi(token.access_token);
        if (apiIGData) {
            await createOrUpdatePostsDataLocalCopy(apiIGData);
            return apiIGData;
        }
    }

    const data = await getProfilePostsDataOnLocalCopy();
    return data;
}

async function fetchOrUpdateFBAcessToken(): Promise<
    InstaTokenData | null
> {
    const savedToken = await getTokenDataOnDb();

    if (savedToken) {
        if (
            Date.now() >=
            Number(savedToken.generated_at) + Number(savedToken.expires_in) * 1000
        ) {
            const newTokenData = await renewToken(savedToken.access_token);
            // const newToken = setTokenData(newTokenData);
            const newToken = await setTokenDataOnDb(newTokenData);

            return newToken;
        }

        return savedToken;
    }

    return null
}

async function fetchAndSlicePosts() {
    const data = await fetchPostsData();

    if (data && data.length > 0) {
        // Ordena por data
        const orderedPosts = data.sort(
            (a, b) =>
                Date.parse(String(b.timestamp)) - Date.parse(String(a.timestamp))
        );
        // Seleciona os 10 primeiros
        const slicedPosts = orderedPosts.slice(0, 10);

        return slicedPosts;
    }
};

export { fetchAndSlicePosts as fetchPosts }