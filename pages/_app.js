import * as Sentry from '@sentry/node';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from '@/Layout/Layout';
import { useStore } from 'store/config';

import 'styles/fonts.css';
import 'styles/tailwind.css';
import 'styles/google-searchbox.css';
import 'styles/images.css';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const MyApp = ({ Component, pageProps, err }) => {
  const store = useStore();
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Component {...pageProps} err={err} />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
