import { NextResponse } from "next/server";
import { sendContactFormEmail } from '@/lib/ses';

const TO_EMAIL = process.env.TO_EMAIL;

export async function POST(
  request: Request 
) {
  const req = await request.json();

  try {
    const data = await sendContactFormEmail(
      {
        name: req.name,
        email: req.email,
        message: req.message
      },
      TO_EMAIL!,
      process.env.FROM_EMAIL! // This should be a verified email address
    );
    
    return NextResponse.json({ 
      messageId: data.MessageId,
      success: true 
    }, { status: 201 });
  } catch (e) {
    console.log('SES Error:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}
