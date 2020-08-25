import Document, { Html, Head, Main, NextScript } from 'next/document';
import documentLang from 'next-translate/documentLang';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={documentLang(this.props)}>
        <Head>
          <script src="/scripts/modernizr-webp.js" defer></script>
          {/* {documentLang(this.props) === 'fr' ? (
            <script src="/scripts/tawktofr.js" defer></script>
          ) : (
            <script src="/scripts/tawkto.js" defer></script>
          )} */}
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
