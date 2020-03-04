import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="/scripts/tawkto.js" defer></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
