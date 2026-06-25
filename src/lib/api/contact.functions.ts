import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  service: z.string().min(1),
  budget: z.string().optional().default(""),
  message: z.string().min(1),
  heardAbout: z.string().optional().default(""),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "re_YOUR_API_KEY_HERE") {
      throw new Error("RESEND_API_KEY is not configured. Add it to your .env file.");
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    // ── 1. Notify VextoraTech ─────────────────────────────────────────────────
    await resend.emails.send({
      from: `VextoraTech Contact Form <${from}>`,
      to: ["info@vextoratech.com"],
      replyTo: data.email,
      subject: `New inquiry: ${data.service} — ${data.name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',system-ui,sans-serif;color:#e6edf3">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#161b22;border-radius:16px;overflow:hidden;border:1px solid #30363d">
    <tr>
      <td style="background:linear-gradient(135deg,#4f8ef7,#7c3aed);padding:32px 40px">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">📬 New Contact Form Submission</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px">VextoraTech · ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 40px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                ${row("Name", data.name)}
                ${row("Company", data.company || "—")}
                ${row("Email", `<a href="mailto:${data.email}" style="color:#4f8ef7">${data.email}</a>`)}
                ${row("Phone", data.phone || "—")}
                ${row("Service", data.service)}
                ${row("Budget", data.budget || "—")}
                ${row("How They Heard", data.heardAbout || "—")}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#0d1117;border-radius:12px;padding:20px;border-left:3px solid #4f8ef7">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#7d8590">Project Message</p>
              <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${data.message}</p>
            </td>
          </tr>
        </table>
        <div style="margin-top:28px;text-align:center">
          <a href="mailto:${data.email}" style="display:inline-block;background:linear-gradient(135deg,#4f8ef7,#7c3aed);color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px">Reply to ${data.name}</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 40px;border-top:1px solid #30363d;text-align:center">
        <p style="margin:0;font-size:12px;color:#7d8590">VextoraTech · info@vextoratech.com · Lahore, Pakistan</p>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    // ── 2. Auto-reply to the user ─────────────────────────────────────────────
    await resend.emails.send({
      from: `VextoraTech <${from}>`,
      to: [data.email],
      replyTo: "info@vextoratech.com",
      subject: "We received your message — VextoraTech",
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',system-ui,sans-serif;color:#e6edf3">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#161b22;border-radius:16px;overflow:hidden;border:1px solid #30363d">
    <tr>
      <td style="background:linear-gradient(135deg,#4f8ef7,#7c3aed);padding:32px 40px;text-align:center">
        <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;letter-spacing:-.5px">VextoraTech</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px">AI-Powered Software Development</p>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 40px 28px">
        <h2 style="margin:0 0 16px;font-size:22px;font-weight:700">Thanks for reaching out, ${data.name}! 👋</h2>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#adbac7">
          We've received your inquiry about <strong style="color:#e6edf3">${data.service}</strong> and our team will review it shortly.
        </p>
        <div style="background:#0d1117;border-radius:12px;padding:24px;border:1px solid #30363d;margin-bottom:24px">
          <p style="margin:0 0 8px;font-size:13px;color:#7d8590;font-weight:600;text-transform:uppercase;letter-spacing:.05em">What happens next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #21262d">
                <div style="display:flex;align-items:center;gap:12px">
                  <span style="display:inline-block;width:28px;height:28px;background:linear-gradient(135deg,#4f8ef7,#7c3aed);border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#fff">1</span>
                  <span style="font-size:14px;color:#adbac7;padding-left:12px">Your message lands with our team at <strong style="color:#e6edf3">info@vextoratech.com</strong></span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #21262d">
                <div style="display:flex;align-items:center;gap:12px">
                  <span style="display:inline-block;width:28px;height:28px;background:linear-gradient(135deg,#4f8ef7,#7c3aed);border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#fff">2</span>
                  <span style="font-size:14px;color:#adbac7;padding-left:12px">We review your project details and prepare an honest assessment</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0">
                <div style="display:flex;align-items:center;gap:12px">
                  <span style="display:inline-block;width:28px;height:28px;background:linear-gradient(135deg,#4f8ef7,#7c3aed);border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#fff">3</span>
                  <span style="font-size:14px;color:#adbac7;padding-left:12px">We reply to <strong style="color:#e6edf3">${data.email}</strong> within <strong style="color:#4f8ef7">24 hours</strong></span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <p style="margin:0 0 24px;font-size:14px;color:#7d8590">
          Need to talk sooner? WhatsApp us at <a href="https://wa.me/923198562747" style="color:#4f8ef7;text-decoration:none">+92 319 8562747</a> — we're available Mon–Fri, 10am–8pm PKT.
        </p>
        <div style="text-align:center">
          <a href="https://vextoratech.com/projects" style="display:inline-block;background:linear-gradient(135deg,#4f8ef7,#7c3aed);color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px">Browse Our Work</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 40px;border-top:1px solid #30363d;text-align:center">
        <p style="margin:0;font-size:12px;color:#7d8590">© 2025 VextoraTech · Lahore, Pakistan<br>
        <a href="mailto:info@vextoratech.com" style="color:#4f8ef7;text-decoration:none">info@vextoratech.com</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    return { ok: true };
  });

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #21262d;width:36%;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#7d8590;vertical-align:top">${label}</td>
      <td style="padding:8px 0 8px 16px;border-bottom:1px solid #21262d;font-size:14px;color:#e6edf3">${value}</td>
    </tr>`;
}
