import { cookies } from 'next/headers';

async function setCookie(key: string, data: any) {
    // SET_COOKIE
    cookies().set(
        key,
        JSON.stringify(data),
        {
            path: '/',
            maxAge: 60 * 60 * 1, // 1hr
        }
    )
}

async function getCookie(cookieName: string) {
    // GET_COOKIE
    if (cookies().has(cookieName)) {
        const cookiesData = cookies().get(cookieName)?.value

        return cookiesData
    }

    return undefined
}

// function setLocalStorageData(key: string, data: any, maxAgeInSeconds: number) {
//     // SET LOCAL STORAGE DATA
//     const now = new Date().getTime();
//     const item = {
//         data,
//         expiry: now + maxAgeInSeconds * 1000, // Convert seconds to milliseconds
//     };
//     localStorage.setItem(key, JSON.stringify(item));
// }

// function getLocalStorageData(key: string, ls: any) {
//     // CHECK IF LOCAL STORAGE DATA EXISTS
//     const dataString = ls.getItem(key);
//     const now = new Date().getTime();

//     if (dataString) {
//         const item = JSON.parse(dataString);
//         if (now >= item.expiry) {
//             ls.removeItem(key);
//             return undefined;
//         }

//         return item.data;
//     }

//     return undefined;
// }

export { getCookie, setCookie }
