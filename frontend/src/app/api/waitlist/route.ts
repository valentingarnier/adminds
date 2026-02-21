import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Adminds <onboarding@resend.dev>",
      to: "contact@adminds.ch",
      subject: `Nouvelle inscription waitlist — ${email}`,
      text: `Nouvelle inscription sur la waitlist :\n\nEmail : ${email}\nDate : ${new Date().toLocaleString("fr-CH")}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
