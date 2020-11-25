const Sentry = require('@sentry/node');
const Firestore = require('@google-cloud/firestore');

import { CREDENTIALS } from 'data/gcp';

export default async (req, res) => {
  const db = new Firestore(CREDENTIALS);
  db.settings({ ignoreUndefinedProperties: true });

  const bookingdata = req.body;

  try {
    const docRef = db.collection('paid_bookings').doc(bookingdata.pid);

    // Update booking in db
    await docRef.update({
      phoneNumber: bookingdata.phoneNumber,
      deliveryAddress: bookingdata.deliveryAddress,
      placeId: bookingdata.placeId,
      adults: bookingdata.adults,
      children: bookingdata.children,
    });

    // Send confirmation SMS if needed
    if (bookingdata.prevPhoneNumber !== bookingdata.phoneNumber) {
      sendConfirmationSms(bookingdata.phoneNumber);
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
const sendConfirmationSms = (phoneNumber) => {
  console.log('Send confirmation SMS');
  console.log({ phoneNumber });
};
