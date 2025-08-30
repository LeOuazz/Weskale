// app/api/notify/route.ts
import { Resend } from "resend";

const EMAIL_TO = "contact@weskaleagency.com";
const EMAIL_FROM = "Weskale <no-reply@weskaleagency.com>"; // domaine vérifié sur Resend

export async function POST(req: Request) {
    try {
        const { email, hp } = await req.json();

        // Honeypot anti-spam
        if (hp) return new Response("OK", { status: 200 });

        // Validation simple
        const isValid =
            typeof email === "string" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!isValid) return new Response("Invalid email", { status: 400 });

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: "New notify signup",
            replyTo: email, // tu peux répondre directement au prospect
            text: `New email subscribed: ${email}`,
            html: `
        <div style="font-family:Inter,Arial,sans-serif">
          <h2>New notify signup</h2>
          <p><b>Email:</b> ${email}</p>
          <p>Source: weskale.com</p>
        </div>
      `,
        });

        return Response.json({ ok: true });
    } catch (e) {
        console.error(e);
        return new Response("Server error", { status: 500 });
    }
}
