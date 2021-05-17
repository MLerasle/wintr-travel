import * as Sentry from '@sentry/node';

import { publishBooking } from 'lib/gcp';

export default async (req, res) => {
  try {
    const booking = req.body;
    publishBooking(booking);

    res.status(201).json({ booking });
  } catch (error) {
    Sentry.captureException(error);

    res.status(404).json({
      message: "Une erreur est survenue lors de l'enregistrement du booking.",
      error,
    });
  }
};
