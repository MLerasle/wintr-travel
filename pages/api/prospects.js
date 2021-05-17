const Sentry = require('@sentry/node');

// Temporary store contacts in Firestore
import { storeContactInFirestore } from 'lib/gcp';
// import { createContact } from 'lib/sendinblue';

export default async (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email } = req.body;
    await storeContactInFirestore(email);
    // await createContact(email);

    res.status(201).end();
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while creating contact in Sendinblue',
      error,
    });
  }
};
