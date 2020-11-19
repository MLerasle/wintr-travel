const SibApiV3Sdk = require('sib-api-v3-sdk');
const Sentry = require('@sentry/node');
const Firestore = require('@google-cloud/firestore');


const defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =
  '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';
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const db = new Firestore({
  projectId: 'wintr-production-256921',
  credentials: {
    client_email:
      'website-vercel@wintr-production-256921.iam.gserviceaccount.com',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBDQvA4ZTzTlsy\nOowSjVPxthfFLhofUQIy5ZWSa1IAhdhVTQG/SnSNalD5/TGeQ3dbsWgjjtALkuJy\n0tMjYBLyoEplJEw92hJUtnDsRY6KisyYlttge5BwZNFTjml1iaCqFk69k/AhTyTx\nA6On+zMGeSkXMUsDohcD0fai1I3NBaVF+SPoRl4l7Zl9z28KWGwr6kVFvtFLaVue\nuAhCO5dZV9hS5ZUz9GRd+tbjy1MKpyz0F5WJ4pzpMvpInj4GbFRRbtS9MSF1c9Cf\nRiL89rYcrKarQmvOoBDqe5xZvinlstO+AgtxEO0iNCZq9zyoW/K947AZ83ys8rjJ\nStf/oHCBAgMBAAECggEAUB44bwOPvAwcV/OpVze1C17dbZVM/QszJOlYEkyc2x+x\nIPGVFIzzYw8o7R7xvTNVsUWmqP8ng24hsbKiMo+4PV5dka0nQRIkQmj242+YkRG6\niGcvQ1L0pliI8SrsxH1qIrygUBg587DzbVzryha73edhsMDh12+pKoo0V+5rrRZ9\nDHPz3JkWzRxI0smrYZeU/GyOOBj+0/e6SfmDRr7NWaqDaYM0PCxyqLQRTSTKujA2\nhD1B9i4UlQq0lgU0IZ8Zq9QczX2fkmPJsjcWK6iVC10afo7quyPRzM5ZPsJtzrHI\n8Ji91PZrqy8NNiJSu9nVwfehhrBxzxjI3r5E7nsyQwKBgQD+HSr0knezpFmH+3rg\n6uCLiVlc+sbq+QHjTL6M6EvVQxaphsQ1yM3Rw84SD4fBDyhkOGPBWy9TUMvgYihC\nWouGqVEqUlsUL9+tK33quqRrnduWxf67ykfGNogAlUSxjew0bya+Ohm0SSphaFh2\nOccGlOL4gktZxwvbLKACdDu6uwKBgQDCe9rMklVciaJuojDhiqHWMl3Ujci9ekYq\nu5xHb3ibblTTVBz9LdK+ZWvuESy2tsp0+nwJH1WaxAVxXJxMj+0aOe7aOxL+7DI8\nXdbjz0vXd+blLSgA2WCZRVKq1xmKGkoMqTtP8nJVYB3Rl7vnFhPO+EbF2VhrQ5YK\n7o691loD8wKBgQCik3Ss/pw4wXhKaJlIFt1MSLZ0pzjmkiMkEjCDJAeITKDOGxuj\nMXKEtto7cdYvrQvxeqZPyY/wpOubBhGtyhIkOGVmR0RgGPTo7L9lkr2o4FjiEJCW\nAqeC59aBUP6e/ibVsRs/bxqM3paPtVuLYBG2Y0EHLw0YRiGOuvEwQL8KCwKBgQCr\noXnaB1nlrGD4mZHhuOJRkWlU5zs8W+gIVkD4mdsp8BhT12st036kIAU7t1Rqeq34\nxgUoV8rIJi1XeY9F0c5A0teDJ5b/+ZnrxDScHpijsmDF5y/ib/Pbz13A/sq/Iawv\nuDlruF5GEei+ytU8fjNE974dZE2ve5myVA0MY1pVGQKBgEZKYbgWJxrJmsRrrAgU\nHnnE4aXd/C/WKlInkcUKNHf5e89SeWwK0gDJXghqbJzO+PgxGKR5Uh4OhdZSwlZF\nw8Q7Gc0R2ONAt/la3RVfvAs79+tc5l/DwyuKUT33f9doGUD0UvGipQ/rOy0QRkho\n+7hg/yWZouD8GIKcxPhxiWM6\n-----END PRIVATE KEY-----\n',
  },
});

import { formatDateLong } from 'helpers/dates';
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
        name: 'Wintr Travel',
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
        startDateHumanReadable: formatDateLong(bookingdata.firstDay),
        amount: bookingdata.amount,
        paymentIntentId: bookingdata.paymentIntentId,
        deliveryAddress: bookingdata.deliveryAddress,
      },
      subject: `Votre réservation ${bookingdata.paymentIntentId} est confirmée`,
      tags: ['booking'],
    };

    // enregistre le booking dans son propre document sur Cloud Firestore
    //console.log(db);
    //console.log(db.collection('paid_bookings'));
    const docRef = db.collection('paid_bookings').doc('test').add({test: 'blah'}});
    //await docRef.set(bookingdata);
    //console.log(docRef);

    // appelle Sendinblue pour envoie de mail
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(bookingdata));
        docRef.update({notification_email_timestamp: Math.floor(Date.now()/1000)});
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
