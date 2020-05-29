import Document, { Html, Head, Main, NextScript } from 'next/document';
import documentLang from 'next-translate/documentLang';

class MyDocument extends Document {
  render() {
    return (
      // Changing lang will be available in next-translate 0.16
      <Html lang={documentLang(this.props)}>
        <Head>
          <script src="/scripts/modernizr-webp.js" defer></script>
          {/* <script src="/scripts/tawkto.js" defer></script> */}
        </Head>
        <body className="font-body" onUnload={this.onUnload}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
