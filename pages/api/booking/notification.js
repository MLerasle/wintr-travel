const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = "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";
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
        name: "Wintr Travel",
        email: "support@wintr.travel"
      },
      to: [{
        email: bookingdata.email,
        name: bookingdata.name
      }],
      templateId: 1,
      params: {
        name: bookingdata.name,
        startDateHumanReadable: Date.parse(bookingdata.firstDay).toLocaleString('fr-fr', {weekday: 'long', year: 'numeric',month: 'long'});,
        amount: bookingdata.amount,
        paymentIntentId: bookingdata.paymentIntentId,
        deliveryAddress: bookingdata.deliveryAddress
      },
      subject:` Votre réservation ${bookingdata.paymentIntentId} est confirmée`,
      tags:["booking"]
    }

    // Call sendinblue API to send email
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
       console.log('API called successfully. Returned data: ' + data);
       res.status(204).end();
    }, function(error) {
      console.error(error);
    });
    
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      message: "Error while sending notification",
      error,
    });
  }
};

