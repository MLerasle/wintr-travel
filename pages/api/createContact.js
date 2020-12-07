const SibApiV3Sdk = require('sib-api-v3-sdk');
const Sentry = require('@sentry/node');

import { SIB_API_KEY } from 'lib/sendinblue';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SIB_API_KEY;
const apiInstance = new SibApiV3Sdk.ContactsApi();
let contact = new SibApiV3Sdk.CreateContact();

export default async (req, res) => {
  try {
    contact = {
      email: req.body.email,
      listIds: [6],
    };
    await apiInstance.createContact(contact);
    res.status(201).end();
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while creating contact in Sendinblue',
      error,
    });
  }
};
