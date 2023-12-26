import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Destructuring response token and input field value from request body
  const { token } = await req.json()
  const auth = req.headers.get('Authorization')?.split(' ')[1]

  if (auth !== process.env.NEXT_BEARER_TOKEN) {
    return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
  }

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
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

    // Check response status and send back to the client-side
    if (response.data.success) {
      // console.log(response.data)
      return NextResponse.json({ message: "Human 👨 👩", success: true }, { status: 200 });
    }

    // console.log(response.data)
    return NextResponse.json({ message: "Robot 🤖", success: false }, { status: 200 });

  } catch (error: any) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.log(error);
    return NextResponse.json({ message: "Error verifying reCAPTCHA", details: error.message }, { status: 500 });
  }
}