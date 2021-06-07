import * as Sentry from '@sentry/node';

import { getBookingDocRef, updateBookingInFirestore } from 'lib/gcp';
import { sendPhoneNumberConfirmationSms } from 'lib/sendinblue';
import { updateCustomer } from 'lib/stripe';

export default async (req, res) => {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    return res.status(405).end('Method Not Allowed');
  }

  const booking = req.body;
  const { id } = req.query;

  try {
    const docRef = getBookingDocRef(id);

    // Update booking in db
    await updateBookingInFirestore(id, {
      phoneNumber: booking.phoneNumber,
      deliveryAddress: booking.deliveryAddress,
      placeId: booking.placeId,
      adults: booking.adults,
      children: booking.children,
    });

    // Send confirmation SMS and update Stripe customer if needed
    if (booking.prevPhoneNumber !== booking.phoneNumber) {
      await sendPhoneNumberConfirmationSms(booking.phoneNumber);
      const doc = await docRef.get();
      const docData = doc.data();
      await updateCustomer(docData.stripeCustomerId, {
        phone: booking.phoneNumber,
      });
    }

    res.status(200).json({ booking });
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({
      message: "Une erreur est survenue lors de l'enregistrement du booking.",
      error,
    });
  }
};
