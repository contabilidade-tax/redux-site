'use server'
import axios from "axios";

async function validateRecaptcha(token: string) {
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        {},
        {
            params: {
                secret: process.env.NEXT_PUBLIC_SITE_SECRET_KEY,
                response: token
            }
        }
    );

    if (response.data.success) {
        console.log("Human 👨 👩")
        return true
    }

    console.log("Robot 🤖")
    return false
}

export { validateRecaptcha }