'use server'
import { database, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import axios from "axios";

async function setTokenDataOnDb(tokenData: Partial<schema.TokenDataInsert>) {
    try {
        // Check if record exists
        const existing = await database
            .select()
            .from(schema.tokenData)
            .where(eq(schema.tokenData.id, 1));

        let result;
        if (existing.length > 0) {
            // Update existing record
            const updated = await database
                .update(schema.tokenData)
                .set({
                    access_token: tokenData.access_token || '',
                    token_type: tokenData.token_type,
                    expires_in: tokenData.expires_in?.toString() || '',
                    generated_at: tokenData.generated_at?.toString() || '',
                    permissions: tokenData.permissions,
                })
                .where(eq(schema.tokenData.id, 1))
                .returning();
            result = updated[0] || null;
        } else {
            // Create new record
            const inserted = await database
                .insert(schema.tokenData)
                .values({
                    id: 1,
                    access_token: tokenData.access_token || '',
                    token_type: tokenData.token_type,
                    expires_in: tokenData.expires_in?.toString() || '',
                    generated_at: tokenData.generated_at?.toString() || '',
                    permissions: tokenData.permissions,
                })
                .returning();
            result = inserted[0] || null;
        }
        return result;
    } catch (error) {
        console.error('Error setting token data:', error);
        throw error;
    }
}

async function getTokenDataOnDb() {
    try {
        const data = await database
            .select()
            .from(schema.tokenData)
            .where(eq(schema.tokenData.id, 1));

        if (data.length > 0) {
            return {
                ...data[0],
                generated_at: data[0].generated_at,
                expires_in: Number(data[0].expires_in),
                token_type: data[0].token_type || 'bearer',
            };
        }

        return null;
    } catch (error) {
        console.error('Error getting token data:', error);
        throw error;
    }
}

async function renewToken(
    expiredToken: string
): Promise<Partial<schema.TokenDataInsert> | null> {
    // const key = process.env.NEXT_CRYPTO_KEY;
    // const iv = process.env.NEXT_CRYPTO_IV;
    // const authorization = process.env.NEXT_BEARER_TOKEN;
    //
    // const api_base = "https://api.instagram.com/oauth/authorize";
    // const appId = process.env.NEXT_API_IG_APP_ID;
    // const scope = "user_profile,user_media";
    // const redirectUri = `/api/instaData/authorize/${encodeURIComponent(
    //   criptografar(authorization, key, iv)
    // )}/`;

    try {
        const url = `${process.env.NEXT_API_IG_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${expiredToken}`;
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
        return null;
    }
}


export { setTokenDataOnDb, getTokenDataOnDb, renewToken }