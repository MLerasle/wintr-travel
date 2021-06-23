import { withSentry } from '@sentry/nextjs';

import { sendContactFormEmail } from 'lib/sendinblue';

async function handler(req, res) {
  const { name, email, message } = req.body;
  await sendContactFormEmail(name, email, message);
  res.status(200).end();
}

export default withSentry(handler);
