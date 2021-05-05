import * as Sentry from '@sentry/node';

import Layout from '@/Layout/Layout';
import { BookingContextProvider } from 'context/booking-context';

import 'styles/fonts.css';
import 'styles/tailwind.css';
import 'styles/google-searchbox.css';
import 'styles/phone-input.css';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const MyApp = ({ Component, pageProps, err }) => (
  <BookingContextProvider>
    <Layout>
      <Component {...pageProps} err={err} />
    </Layout>
  </BookingContextProvider>
);

export default MyApp;
