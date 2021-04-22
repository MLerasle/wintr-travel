const { PubSub } = require('@google-cloud/pubsub');
import * as Sentry from '@sentry/node';
import Firestore from '@google-cloud/firestore';

import { GCP_CREDENTIALS } from 'lib/gcp';

const topicName = process.env.GOOGLE_PUBSUB_TOPIC_BOOKINGS;
const pubSubClient = new PubSub(GCP_CREDENTIALS);

import { getPrices } from 'helpers/booking';

const db = new Firestore(GCP_CREDENTIALS);

export default async (req, res) => {
  try {
    const prices = getPrices(req.body.adults.length, req.body.children.length);
    const amount = prices.total;

    // Create the booking payload we want to store
    const booking = {
      ...req.body,
      amount,
    };

    if (process.env.VERCEL_ENV === 'development') {
      // Save the booking directly into Firestore
      const docRef = db
        .collection(process.env.GOOGLE_FIRESTORE_BOOKINGS)
        .doc(booking.paymentIntentId);
      await docRef.set(booking);
    } else {
      // Publish message to Pub/Sub topic
      await publishMessage(booking);
    }

    res.status(201).json({ booking });
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({
      message: "Une erreur est survenue lors de l'enregistrement du booking.",
      error,
    });
  }
};

async function publishMessage(booking) {
  const data = JSON.stringify(booking);
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    Sentry.captureException(error);
    process.exitCode = 1;
  }
}
