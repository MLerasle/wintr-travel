const { Firestore } = require('@google-cloud/firestore');

import { getPrices } from 'helpers/booking';

export const GCP_CREDENTIALS = {
  projectId: 'wintr-production-256921',
  credentials: {
    client_email:
      'website-vercel@wintr-production-256921.iam.gserviceaccount.com',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBDQvA4ZTzTlsy\nOowSjVPxthfFLhofUQIy5ZWSa1IAhdhVTQG/SnSNalD5/TGeQ3dbsWgjjtALkuJy\n0tMjYBLyoEplJEw92hJUtnDsRY6KisyYlttge5BwZNFTjml1iaCqFk69k/AhTyTx\nA6On+zMGeSkXMUsDohcD0fai1I3NBaVF+SPoRl4l7Zl9z28KWGwr6kVFvtFLaVue\nuAhCO5dZV9hS5ZUz9GRd+tbjy1MKpyz0F5WJ4pzpMvpInj4GbFRRbtS9MSF1c9Cf\nRiL89rYcrKarQmvOoBDqe5xZvinlstO+AgtxEO0iNCZq9zyoW/K947AZ83ys8rjJ\nStf/oHCBAgMBAAECggEAUB44bwOPvAwcV/OpVze1C17dbZVM/QszJOlYEkyc2x+x\nIPGVFIzzYw8o7R7xvTNVsUWmqP8ng24hsbKiMo+4PV5dka0nQRIkQmj242+YkRG6\niGcvQ1L0pliI8SrsxH1qIrygUBg587DzbVzryha73edhsMDh12+pKoo0V+5rrRZ9\nDHPz3JkWzRxI0smrYZeU/GyOOBj+0/e6SfmDRr7NWaqDaYM0PCxyqLQRTSTKujA2\nhD1B9i4UlQq0lgU0IZ8Zq9QczX2fkmPJsjcWK6iVC10afo7quyPRzM5ZPsJtzrHI\n8Ji91PZrqy8NNiJSu9nVwfehhrBxzxjI3r5E7nsyQwKBgQD+HSr0knezpFmH+3rg\n6uCLiVlc+sbq+QHjTL6M6EvVQxaphsQ1yM3Rw84SD4fBDyhkOGPBWy9TUMvgYihC\nWouGqVEqUlsUL9+tK33quqRrnduWxf67ykfGNogAlUSxjew0bya+Ohm0SSphaFh2\nOccGlOL4gktZxwvbLKACdDu6uwKBgQDCe9rMklVciaJuojDhiqHWMl3Ujci9ekYq\nu5xHb3ibblTTVBz9LdK+ZWvuESy2tsp0+nwJH1WaxAVxXJxMj+0aOe7aOxL+7DI8\nXdbjz0vXd+blLSgA2WCZRVKq1xmKGkoMqTtP8nJVYB3Rl7vnFhPO+EbF2VhrQ5YK\n7o691loD8wKBgQCik3Ss/pw4wXhKaJlIFt1MSLZ0pzjmkiMkEjCDJAeITKDOGxuj\nMXKEtto7cdYvrQvxeqZPyY/wpOubBhGtyhIkOGVmR0RgGPTo7L9lkr2o4FjiEJCW\nAqeC59aBUP6e/ibVsRs/bxqM3paPtVuLYBG2Y0EHLw0YRiGOuvEwQL8KCwKBgQCr\noXnaB1nlrGD4mZHhuOJRkWlU5zs8W+gIVkD4mdsp8BhT12st036kIAU7t1Rqeq34\nxgUoV8rIJi1XeY9F0c5A0teDJ5b/+ZnrxDScHpijsmDF5y/ib/Pbz13A/sq/Iawv\nuDlruF5GEei+ytU8fjNE974dZE2ve5myVA0MY1pVGQKBgEZKYbgWJxrJmsRrrAgU\nHnnE4aXd/C/WKlInkcUKNHf5e89SeWwK0gDJXghqbJzO+PgxGKR5Uh4OhdZSwlZF\nw8Q7Gc0R2ONAt/la3RVfvAs79+tc5l/DwyuKUT33f9doGUD0UvGipQ/rOy0QRkho\n+7hg/yWZouD8GIKcxPhxiWM6\n-----END PRIVATE KEY-----\n',
  },
};

const db = new Firestore(GCP_CREDENTIALS);
db.settings({ ignoreUndefinedProperties: true });

export const createBooking = async (booking) => {
  try {
    const prices = getPrices(booking.adults.length, booking.children.length);
    const amount = prices.total;

    const updatedBooking = {
      ...booking,
      amount,
    };

    await storeBookingInFirestore(updatedBooking);
  } catch (error) {
    throw new Error(error);
  }
};

export const storeBookingInFirestore = async (booking) => {
  const docRef = getBookingDocRef(booking.paymentIntentId);
  await docRef.set(booking);
};

export const updateBookingInFirestore = async (bookingId, data) => {
  const docRef = getBookingDocRef(bookingId);
  await docRef.update(data);
};

export const storeContactInFirestore = async (email) => {
  await db.collection(process.env.GOOGLE_FIRESTORE_CONTACTS).add(email);
};

export const getBooking = async (bookingId) => {
  const bookingRef = getBookingDocRef(bookingId);
  const bookingDoc = await bookingRef.get();
  const booking = bookingDoc.data();
  return booking;
};

export const getBookingDocRef = (bookingId) => {
  const docRef = db
    .collection(process.env.GOOGLE_FIRESTORE_BOOKINGS)
    .doc(bookingId);

  return docRef;
};
