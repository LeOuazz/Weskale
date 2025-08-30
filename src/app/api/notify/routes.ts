import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { email, hp } = await req.json();
        if (hp) return new Response("OK", { status: 200 });

        const isValid =
            typeof email === "string" &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!isValid) return new Response("Invalid email", { status: 400 });

        const transporter = nodemailer.createTransport({
            host: "smtp.ionos.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER, // ex: contact@weskale.com
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Weskale" <contact@weskaleagency.com>`,
            to: "contact@weskaleagency.com",
            subject: "New notify signup",
            replyTo: email,
            text: `New email: ${email}`,
        });

        return Response.json({ ok: true });
    } catch (e) {
        console.error(e);
        return new Response("Server error", { status: 500 });
    }
}
