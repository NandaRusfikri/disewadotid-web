import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from "next/script"
// @ts-ignore
import * as gtag from "gtag"
export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
          <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
          />
      <Component {...pageProps} />
      </>
  )
}
