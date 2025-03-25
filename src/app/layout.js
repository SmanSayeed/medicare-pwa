import localFont from "next/font/local";
import "./globals.css";
import RootLayoutClient from "./components/RootLayoutClient";
import Head from "next/head";
import Script from "next/script";
import siteHelper from "@/helpers/siteHelper";
import ReduxProvider from "@/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/contexts/AuthContext";
// import  "bootstrap/dist/css/bootstrap.min.css" // it doesn't work
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: siteHelper.title,
  description: siteHelper.description,
  manifest: "/web.manifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="CliniqueX" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#0134d4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        <title>{siteHelper.title}</title>

        <link rel="icon" href="/img/core-img/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/icons/icon-96x96.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/img/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/img/icons/icon-167x167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/icons/icon-180x180.png"
        />
        <link rel="stylesheet" href="/style.css" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        {/* <AuthProvider> */}
          <RootLayoutClient>
          
              {children}
           
          </RootLayoutClient>
          {/* </AuthProvider> */}
          <ToastContainer />
        </ReduxProvider>

        {/*-- Preloader */}
        {/* <div id="preloader">
    <div className="spinner-grow text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div> */}

        {/* Add scripts here */}
        <Script
          src="/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/js/slideToggle.min.js" strategy="lazyOnload" />
        <Script src="/js/internet-status.js" strategy="lazyOnload" />
        <Script src="/js/dark-rtl.js" strategy="lazyOnload" />
        <Script src="/js/active.js" strategy="lazyOnload" />
        <Script src="/js/pwa.js" strategy="lazyOnload" />
        <Script src="/js/venobox.min.js" strategy="lazyOnload" />

        {/* <Script strategy="lazyOnload">
          {`
          document.addEventListener('DOMContentLoaded', function () {
            if (document.getElementById('promotionVideo')) {
              window.addEventListener('load', function () {
                try {
                  const venobox = new VenoBox({
                    selector: '.promo-video',
                    popup: true,
                    overlayColor: 'rgba(15,7,15,0.75)',
                    spinner: 'pulse',
                    navSpeed: 400
                  });
                } catch (e) {
                  console.error('Error initializing VenoBox', e);
                }
              });
            }
          });
          `}
        </Script> */}
      </body>
    </html>
  );
}
