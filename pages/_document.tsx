// /pages/_document.js
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@700&display=swap"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
