import NextErrorComponent from 'next/error';

const Error = ({ statusCode, hasGetInitialPropsRun, err }) => {
  return <NextErrorComponent statusCode={statusCode} />;
};

Error.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }
  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default Error;
