import Stripe from 'stripe';
const Sentry = require('@sentry/node');
const Firestore = require('@google-cloud/firestore');
const SibApiV3Sdk = require('sib-api-v3-sdk');

import { GCP_CREDENTIALS } from 'lib/gcp';
import { SIB_API_KEY } from 'lib/sendinblue';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SIB_API_KEY;
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export default async (req, res) => {
  try {
    const booking = req.body;

    refundPaymentIntent(booking);
    refundInvoice(booking);
    markBookingAsCanceled(booking);
    sendConfirmationEmail(booking);

    res.status(200).json({
      message: `La réservation ${booking.paymentIntentId} a bien été annulée.`,
    });
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ message: 'Une erreur est survenue', error });
  }
};

const refundPaymentIntent = async (booking) => {
  await stripe.refunds.create({
    payment_intent: booking.paymentIntentId,
  });
};

const refundInvoice = async (booking) => {
  const invoices = await stripe.invoices.list({
    customer: booking.customerId,
  });

  const invoice = invoices.data[0];

  if (invoice.paid) {
    await stripe.refunds.create({
      payment_intent: invoice.payment_intent,
    });
  }
};

const markBookingAsCanceled = async (booking) => {
  const db = new Firestore(GCP_CREDENTIALS);
  db.settings({ ignoreUndefinedProperties: true });

  const docRef = db
    .collection(process.env.GOOGLE_FIRESTORE_COLLECTION)
    .doc(booking.paymentIntentId);

  await docRef.update({ canceled: true });
};

// WIP
const sendConfirmationEmail = async (booking) => {
  sendSmtpEmail = {
    sender: {
      name: 'Wintr Travel',
      email: 'support@wintr.travel',
    },
    to: [
      {
        email: booking.email,
        name: booking.name,
      },
    ],
    templateId: 1,
    params: {
      name: booking.name,
      amount: booking.amount,
      paymentIntentId: booking.paymentIntentId,
    },
    subject: `Votre réservation ${booking.paymentIntentId} est annulée.`,
    tags: ['booking'],
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};
