const Sentry = require('@sentry/node');

export default async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Received data in send email', name, email, message);
    res.status(201).end();
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while creating contact in Sendinblue',
      error,
    });
  }
};
