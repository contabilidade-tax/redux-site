'use server'
import { database, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

async function setCurrentProfile(currentUserData: Partial<schema.CurrentUserInsert>) {
    try {
        const allowedUserProfileIds = process.env.ALLOWED_USER_ID 
            ? process.env.ALLOWED_USER_ID.split(',').map(id => id.trim()) 
            : [];
        const userProfileId = String(currentUserData.user_id).trim();
        
        // Verifica se o user_id de currentUser está na lista de permitidos
        if (!allowedUserProfileIds.includes(userProfileId)) {
            throw new Error(`Usuário do app inválido! Este app somente deve ser usado pela TAX CONTABILIDADE. code:${userProfileId}:${allowedUserProfileIds}`);
        }

        // Check if record exists
        const existing = await database
            .select()
            .from(schema.currentUser)
            .where(eq(schema.currentUser.id, 1));

        let result;
        if (existing.length > 0) {
            // Update existing record
            const updated = await database
                .update(schema.currentUser)
                .set({
                    access_token: currentUserData.access_token || '',
                    user_id: currentUserData.user_id?.toString() || '',
                })
                .where(eq(schema.currentUser.id, 1))
                .returning();
            result = updated[0] || null;
        } else {
            // Create new record
            const inserted = await database
                .insert(schema.currentUser)
                .values({
                    id: 1,
                    access_token: currentUserData.access_token || '',
                    user_id: currentUserData.user_id?.toString() || '',
                })
                .returning();
            result = inserted[0] || null;
        }
        return result;
    } catch (error) {
        console.error('Error setting current profile:', error);
        throw error;
    }
}

export { setCurrentProfile }