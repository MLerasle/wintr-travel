const Sentry = require('@sentry/node');
const Firestore = require('@google-cloud/firestore');

import { CREDENTIALS } from 'data/gcp';

export default async (req, res) => {
  const db = new Firestore(CREDENTIALS);
  const bookingdata = req.body;
  console.log({ bookingdata });

  try {
    const docRef = db.collection('paid_bookings').doc(bookingdata.pid);

    // Update booking in db
    await docRef.update({
      mobileNumber: bookingdata.mobileNumber,
    });

    // Send confirmation SMS if needed
    if (bookingdata.mobileNumber) {
      sendConfirmationSms(bookingdata.mobileNumber);
    }

    res.status(200).json({ bookingdata });
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({
      message: "Une erreur est survenue lors de l'enregistrement du booking.",
      error,
    });
  }
};

// Code pour envoyer le SMS de confirmation via Sendinblue
const sendConfirmationSms = (mobileNumber) => {
  console.log('Send confirmation SMS');
  console.log({ mobileNumber });
};
