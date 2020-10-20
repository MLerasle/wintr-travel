import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from 'lib/gtag';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                  send_page_view: false
                });
              `,
                }}
              />
            </>
          )}
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
