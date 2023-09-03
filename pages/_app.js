import Layout from '@/Layout/Layout';
import { BookingContextProvider } from 'context/booking-context';

import 'styles/fonts.css';
import 'styles/tailwind.css';
import 'styles/google-searchbox.css';
import 'styles/phone-input.css';

const MyApp = ({ Component, pageProps, err }) => (
  <BookingContextProvider>
    <Layout>
      <Component {...pageProps} err={err} />
    </Layout>
  </BookingContextProvider>
);

export default MyApp;
