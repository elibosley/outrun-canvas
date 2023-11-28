import "./reset.css";
import App from "next/app";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { NextComponentType, NextPage } from "next";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: NextPage["defaultProps"];
}) {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
