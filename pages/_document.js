import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <script src="/scripts/modernizr-webp.js" defer></script>
          {/* <script src="/scripts/tawkto.js" defer></script> */}
          <meta
            name="description"
            content="Faites-vous livrer vos skis et votre forfait dans votre résidence à Flaine avec Wintr Travel.
            Réservez dès maintenant vos prochaines vacances au ski!"
          />
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
