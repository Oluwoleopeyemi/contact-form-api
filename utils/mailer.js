// utils/mailer.js
const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Verify connection once on startup
  transporter.verify().then(() => {
    console.log('📨 SMTP connection verified');
  }).catch(err => {
    console.warn('⚠️  SMTP verification failed:', err.message);
  });

  return transporter;
}

module.exports = async function sendMail(mailOptions) {
  const t = getTransporter();
  return t.sendMail(mailOptions);
};
