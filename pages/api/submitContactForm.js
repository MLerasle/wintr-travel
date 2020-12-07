const SibApiV3Sdk = require('sib-api-v3-sdk');
const Sentry = require('@sentry/node');

import { SIB_API_KEY } from 'lib/sendinblue';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SIB_API_KEY;
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export default async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const formattedMessage = message.replace(/\n/g, '<br>');

    sendSmtpEmail = {
      sender: { name, email },
      to: [{ email: 'support@wintr.travel' }],
      replyTo: { name, email },
      htmlContent: formattedMessage,
      subject: 'Contact form message',
      tags: ['contact'],
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(200).end();
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while creating contact in Sendinblue',
      error,
    });
  }
};
