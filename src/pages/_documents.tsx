import Document, { Head, Html, NextScript, Main } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="author" content="João Victor" />

          {/* Metadados do OpenGraph e Twitter */}
          <meta property="og:title" content="Empréstimos | Klutch" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="Klutch" />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content="Empréstimos | Klutch" />

          <title>Empréstimos | Klutch</title>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}