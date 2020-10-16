const { PubSub } = require('@google-cloud/pubsub');

const topicName = process.env.GOOGLE_PUBSUB_TOPIC_BOOKINGS;
const pubSubClient = new PubSub();

import { getPrices } from 'helpers/booking';

export default async (req, res) => {
  try {
    const prices = getPrices(req.body.adults.length, req.body.children.length);
    const amount = prices.total;

    // Create the booking payload we want to store
    delete req.body['_persist'];
    const booking = {
      ...req.body,
      amount,
    };

    // Publish message to Pub/Sub topic
    await publishMessage(booking);

    res.status(201).json({ booking });
  } catch (error) {
    console.log({ error });
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
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}
