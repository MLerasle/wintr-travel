const SibApiV3Sdk = require('sib-api-v3-sdk');

import { formatDateLong } from 'helpers/dates';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const contactsApiInstance = new SibApiV3Sdk.ContactsApi();
let email = new SibApiV3Sdk.SendSmtpEmail();

export const sendBookingConfirmationEmail = async (booking) => {
  email = {
    sender: {
      name: 'Wintr Travel',
      email: 'support@wintr.travel',
    },
    to: [
      {
        email: booking.email,
        name: `${booking.firstname} ${booking.lastname}`,
      },
    ],
    templateId: 1,
    params: {
      name: `${booking.firstname} ${booking.lastname}`,
      startDateHumanReadable: formatDateLong(booking.firstDay),
      amount: booking.amount,
      paymentIntentId: booking.paymentIntentId,
      deliveryAddress: booking.deliveryAddress,
      link: `${process.env.VERCEL_URL}/booking/${booking.paymentIntentId}`,
    },
    subject: `Votre réservation ${booking.paymentIntentId} est confirmée`,
    tags: ['booking'],
  };

  await apiInstance.sendTransacEmail(email);
};

export const sendContactFormEmail = async (name, email, message) => {
  const formattedMessage = message.replace(/\n/g, '<br>');

  email = {
    sender: { name, email },
    to: [{ email: 'support@wintr.travel' }],
    replyTo: { name, email },
    htmlContent: formattedMessage,
    subject: 'Contact form message',
    tags: ['contact'],
  };

  await apiInstance.sendTransacEmail(email);
};

export const createContact = async (email) => {
  const contact = await contactsApiInstance.createContact({
    email,
    listIds: [6],
  });

  return contact;
};
