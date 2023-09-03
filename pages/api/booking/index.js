import { createBooking } from 'lib/gcp';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const booking = req.body;

  await createBooking(booking);
  res.status(201).json({ booking });
}

export default handler;
