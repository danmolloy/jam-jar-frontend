import { NextResponse } from "next/server";
import SgMail from '@sendgrid/mail'

const TO_EMAIL = process.env.TO_EMAIL


export async function POST(
  request: Request 
) {
  const req = await request.json();


  const emailData = {
    to: TO_EMAIL!,
  from: process.env.FROM_EMAIL!,
  templateId: "d-b9231cb1c21e4462af1d2da00dcb6827",
  dynamic_template_data: {
    toName: "Daniel",
    name: req.name as string,
    email: req.email as string,
    message: req.message as string,
  },
  };
  if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set');
}

SgMail.setApiKey(process.env.SENDGRID_API_KEY);

try {
    const data = await SgMail.send(emailData);
    return NextResponse.json({ ...data, success: true }, { status: 201 });
  } catch (e: any) {
    console.log(e)
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}

