import { Provider } from 'react-redux';
import { useStore } from 'store/config';

import 'assets/style.css';
import 'assets/fonts.css';
import 'assets/background-image.css';
import 'react-day-picker/lib/style.css';
import 'assets/react-day-picker.css';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
