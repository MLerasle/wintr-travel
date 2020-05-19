import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import LayoutCover from '@/Layout/LayoutCover';
import CheckoutForm from '@/App/CheckoutForm';

const Checkout = () => {
  const { t, lang } = useTranslation();
  const stripePromise = loadStripe('pk_test_Wah9lA5G9KC0JfKICOBK0b7j');

  return (
    <LayoutCover>
      <Head>
        <title>{t('checkout:title')} - Wintr Travel</title>
      </Head>
      <Elements stripe={stripePromise} options={{ locale: lang }}>
        <CheckoutForm />
      </Elements>
    </LayoutCover>
  );
};

export default Checkout;
