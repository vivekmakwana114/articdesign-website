import { getAdminEmailHtml, getUserEmailHtml } from "@/lib/emailTemplates";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { fullName, companyName, email, phone, message } = await req.json();

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `SGS: New Lead from ${fullName}`,
      text: `
            Name: ${fullName}
            Company: ${companyName || "N/A"}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
            `,
      html: getAdminEmailHtml({ fullName, companyName, email, phone, message }),
    };

    const userMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: `Thank you for your message`,
      text: `
            Hello ${fullName},
            Thank you for your message. We will get back to you as soon as possible.
            `,
      html: getUserEmailHtml({ fullName, message }),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
