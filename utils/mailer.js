// utils/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"Nestlify Contact" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `💬 New Contact Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 3px 8px rgba(0,0,0,0.05);">
          <div style="background-color: #ff6347; color: white; padding: 16px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <h2 style="margin: 0;">📩 New Message via Nestlify Contact Form</h2>
          </div>
          <div style="padding: 20px; color: #333;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="margin: 10px 0; padding-left: 10px; border-left: 3px solid #ff6347; color: #555;">
              ${message}
            </blockquote>
          </div>
          <div style="background: #f1f1f1; text-align: center; padding: 10px; font-size: 13px; color: #777; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            Sent via <strong>Nestlify Contact Form API</strong> · ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
