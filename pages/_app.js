import * as Sentry from '@sentry/node';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { useStore } from 'store/config';

import 'styles/fonts.css';
import 'styles/tailwind.css';
import 'styles/style.css';

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
        <Component {...pageProps} err={err} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
