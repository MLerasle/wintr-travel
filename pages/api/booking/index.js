import * as Sentry from '@sentry/node';

import { createBooking } from 'lib/gcp';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const booking = req.body;

  try {
    await createBooking(booking);
    res.status(201).json({ booking });
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({
      message: "Une erreur est survenue lors de l'enregistrement du booking.",
      error,
    });
  }
};
