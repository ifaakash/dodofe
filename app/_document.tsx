import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Favicon */}
                <link rel="icon" href="/landing/dodofavicon.png" type="image/png" />

                {/* Meta Tags */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Your website description goes here." />
                <meta name="keywords" content="your, keywords, here" />
                <meta name="author" content="Keshav Malik" />

                {/* Open Graph (OG) Meta Tags for Social Sharing */}
                <meta property="og:title" content="Your Website Title" />
                <meta property="og:description" content="Your website description for social sharing." />
                <meta property="og:image" content="/og-image.png" />
                <meta property="og:url" content="http://dodoclub.in/" />
                <meta property="og:type" content="website" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Your Website Title" />
                <meta name="twitter:description" content="Your website description for Twitter." />
                <meta name="twitter:image" content="/og-image.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
