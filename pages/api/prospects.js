// Temporary store contacts in Firestore
import { storeContactInFirestore } from 'lib/gcp';

async function handler(req, res) {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;
  await storeContactInFirestore(email);

  res.status(201).end();
}

export default handler;
