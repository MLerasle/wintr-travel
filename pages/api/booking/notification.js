const SibApiV3Sdk = require('sib-api-v3-sdk');
const Sentry = require('@sentry/node');
const Firestore = require('@google-cloud/firestore');

import { CREDENTIALS } from 'data/gcp';
import { formatDateLong } from 'helpers/dates';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =
  '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';
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const db = new Firestore(CREDENTIALS);

export default async (req, res) => {
  let bookingdata;
  try {
    // Extract the customer contact information from the base64 "data" element.
    const message = req.body ? req.body.message : null;
    if (message) {
      const buffer = Buffer.from(message.data, 'base64');
      const data = buffer && buffer.toString();
      bookingdata = data && JSON.parse(data);

      console.log(`Received message ${message.messageId}:`);
      console.log(`Data: ${JSON.stringify(bookingdata)}`);
    }

    sendSmtpEmail = {
      sender: {
        name: 'Wintr Travel',
        email: 'support@wintr.travel',
      },
      to: [
        {
          email: bookingdata.email,
          name: bookingdata.name,
        },
      ],
      templateId: 1,
      params: {
        name: bookingdata.name,
        startDateHumanReadable: formatDateLong(bookingdata.firstDay),
        amount: bookingdata.amount,
        paymentIntentId: bookingdata.paymentIntentId,
        deliveryAddress: bookingdata.deliveryAddress,
      },
      subject: `Votre réservation ${bookingdata.paymentIntentId} est confirmée`,
      tags: ['booking'],
    };

    // enregistre le booking dans son propre document sur Cloud Firestore
    const docRef = db
      .collection('paid_bookings')
      .doc(bookingdata.paymentIntentId);

    await docRef.set(bookingdata);

    console.log('Document written: ', { docRef });

    // appelle Sendinblue pour envoie de mail
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Succesfully sent email');
    await docRef.update({
      notification_email_timestamp: Math.floor(Date.now() / 1000),
    });
    console.log('Notification timestamp was updated');
    res.status(204).end();
  } catch (error) {
    console.log({ error });
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while sending notification',
      error,
    });
  }
};
