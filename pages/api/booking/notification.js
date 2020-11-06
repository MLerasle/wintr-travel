const SibApiV3Sdk = require('sib-api-v3-sdk');
const Sentry = require('@sentry/node');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =
  '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';
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
let bookingdata;

export default async (req, res) => {
  try {
    // Extract the customer contact information from the base64 "data" element.
    const message = req.body ? req.body.message : null;
    if (message) {
      const buffer = Buffer.from(message.data, 'base64');
      const data = buffer && buffer.toString();
      bookingdata = data && JSON.parse(data);

      console.log(`Received message ${message.messageId}:`);
      console.log(`Data: ${bookingdata}`);
    }

    sendSmtpEmail = {
      sender: {
        name: 'Skis Wintr',
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
        firstDay: bookingdata.firstDay,
        amount: bookingdata.amount,
        paymentIntentId: bookingdata.paymentIntentId,
      },
      subject: 'Vos skis livrés à Flaine sont réservés !',
      tags: ['booking'],
    };

    // Call sendinblue API to send email
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log('API called successfully. Returned data: ' + data);
        res.status(204).end();
      },
      function (error) {
        console.error(error);
      }
    );
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while sending notification',
      error,
    });
  }
};
