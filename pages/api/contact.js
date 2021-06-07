const Sentry = require('@sentry/node');

import { sendContactFormEmail } from 'lib/sendinblue';

export default async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendContactFormEmail(name, email, message);
    res.status(200).end();
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while sending contact form email via Sendinblue',
      error,
    });
  }
};
