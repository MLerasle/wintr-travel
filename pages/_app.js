import { Provider } from 'react-redux';
import { useStore } from 'store/config';

import 'styles/style.css';
import 'styles/fonts.css';
import 'styles/background-image.css';
import 'react-day-picker/lib/style.css';
import 'styles/react-day-picker.css';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
