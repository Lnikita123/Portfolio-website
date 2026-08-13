import { NextResponse } from "next/server";
import { Resend } from "resend";

// Where the messages land. Override with CONTACT_TO_EMAIL if you ever change inbox.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "nikitalilhore1902@gmail.com";
// Must be a domain verified in Resend. "onboarding@resend.dev" works out of the
// box but can only deliver to the email you signed up with.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  // Honeypot — real users never fill this in.
  website?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Split-based check instead of a regex — linear time, no backtracking.
const isValidEmail = (value: string) => {
  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || /\s/.test(local)) return false;
  if (!domain || domain.length > 255 || /\s/.test(domain)) return false;
  const labels = domain.split(".");
  return labels.length >= 2 && labels.every((label) => label.length > 0);
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Silently accept bot submissions so they don't retry.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (message.length > 5000 || subject.length > 200 || name.length > 100) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return NextResponse.json(
      { error: "Email is not configured yet. Please email me directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      text: `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f0f0f;color:#ededed;border-radius:16px">
          <h2 style="margin:0 0 4px;font-size:20px;color:#a78bfa">New portfolio message</h2>
          <p style="margin:0 0 20px;font-size:13px;color:#9ca3af">Sent from your portfolio contact form</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#9ca3af;width:90px">Name</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#22d3ee">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af">Subject</td><td style="padding:8px 0">${escapeHtml(subject)}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
