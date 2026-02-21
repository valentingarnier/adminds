import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const date = new Date().toLocaleString("fr-CH");

    await Promise.all([
      resend.emails.send({
        from: "Adminds Website <hello@yourclaw.dev>",
        to: "contact@adminds.ch",
        subject: `Nouvelle inscription — ${email}`,
        text: `Nouvelle inscription :\n\nEmail : ${email}\nDate : ${date}`,
      }),

      process.env.SLACK_WEBHOOK_URL
        ? fetch(process.env.SLACK_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: `📩 Nouvelle inscription sur le site web : ${email} (${date})`,
            }),
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
