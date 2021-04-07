import Sentry from '@sentry/node';
import Firestore from '@google-cloud/firestore';
import Stripe from 'stripe';

import { GCP_CREDENTIALS } from 'lib/gcp';

export default async (req, res) => {
  const db = new Firestore(GCP_CREDENTIALS);
  db.settings({ ignoreUndefinedProperties: true });
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

  const bookingdata = req.body;

  try {
    const docRef = db
      .collection(process.env.GOOGLE_FIRESTORE_BOOKINGS)
      .doc(bookingdata.pid);

    // Update booking in db
    await docRef.update({
      phoneNumber: bookingdata.phoneNumber,
      deliveryAddress: bookingdata.deliveryAddress,
      placeId: bookingdata.placeId,
      adults: bookingdata.adults,
      children: bookingdata.children,
    });

    // Send confirmation SMS and update Stripe customer if needed
    if (bookingdata.prevPhoneNumber !== bookingdata.phoneNumber) {
      sendConfirmationSms(bookingdata.phoneNumber);
      const doc = await docRef.get();
      const docData = doc.data();
      await stripe.customers.update(docData.stripeCustomerId, {
        phone: bookingdata.phoneNumber,
      });
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
