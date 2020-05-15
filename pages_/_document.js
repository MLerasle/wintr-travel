import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      // Changing lang will be available in next-translate 0.16
      <Html lang="en">
        <Head>
          <script src="/scripts/modernizr-webp.js" defer></script>
          {/* <script src="/scripts/tawkto.js" defer></script> */}
        </Head>
        <body className="font-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
