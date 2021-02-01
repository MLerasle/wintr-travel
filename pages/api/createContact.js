const SibApiV3Sdk = require('sib-api-v3-sdk');
const Sentry = require('@sentry/node');

// Temporary store contacts in Firestore
const Firestore = require('@google-cloud/firestore');
import { GCP_CREDENTIALS } from 'lib/gcp';

// import { SIB_API_KEY } from 'lib/sendinblue';

// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = SIB_API_KEY;
// const apiInstance = new SibApiV3Sdk.ContactsApi();
let contact = new SibApiV3Sdk.CreateContact();

export default async (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(204).end();
  }
  const db = new Firestore(GCP_CREDENTIALS);
  db.settings({ ignoreUndefinedProperties: true });

  try {
    contact = {
      email: req.body.email,
      // listIds: [6],
    };
    await db.collection(process.env.GOOGLE_FIRESTORE_CONTACTS).add(contact);
    // await apiInstance.createContact(contact);
    res.status(201).end();
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while creating contact in Sendinblue',
      error,
    });
  }
};
