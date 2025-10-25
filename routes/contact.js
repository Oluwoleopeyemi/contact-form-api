// routes/contact.js
const express = require('express');
const router = express.Router();
const sendMail = require('../utils/mailer');

function validate(body) {
  const { name, email, subject, message } = body;
  if (!name || !email || !message) return 'name, email and message are required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'invalid email';
  if (subject && subject.length > 200) return 'subject too long';
  if (message.length > 2000) return 'message too long';
  return null;
}

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ ok: false, error });

  const { name, email, subject = 'New Contact Form Message', message } = req.body;

  try {
    await sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `${subject} — from ${name} <${email}>`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <hr/>
             <p>${message.replace(/\n/g, '<br/>')}</p>`
    });
    return res.json({ ok: true, message: 'Message sent successfully ✅' });
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
});

module.exports = router;
