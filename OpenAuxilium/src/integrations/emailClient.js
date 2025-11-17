import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
  } = process.env;

  if (!SMTP_HOST) {
    throw new Error('SMTP_HOST is not configured for appointment email.');
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: SMTP_SECURE === 'true',
    auth: SMTP_USER
      ? {
          user: SMTP_USER,
          pass: SMTP_PASS,
        }
      : undefined,
  });

  return transporter;
}

export async function sendAppointmentEmail({ to, subject, text }) {
  const transporterInstance = getTransporter();
  const from =
    process.env.APPOINTMENT_FROM_EMAIL ||
    process.env.SMTP_USER ||
    'no-reply@localhost';

  const toAddress = to || process.env.APPOINTMENT_TO_EMAIL || 'support@ravdevops.com';

  await transporterInstance.sendMail({
    from,
    to: toAddress,
    subject: subject || 'New appointment request from website chat',
    text,
  });
}

