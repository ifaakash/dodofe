import { Helmet } from 'react-helmet';

import { STORAGE_CONSTANTS } from "./constants";
import { loadState } from "./localStorage";
import { MetaTagsData } from 'types';
import mixpanel from 'mixpanel-browser';

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    console.log(timeout)
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export function isEmpty(data: any): boolean {
  try {
    if (data === null || data === undefined || typeof data === "undefined") {
      return true;
    }

    const dataType = typeof data;
    const keys = Object.keys(data);
    const len = keys.length;

    switch (dataType) {
      case "string":
        if (data.trim() === "" || data === "null" || data === null) {
          return true;
        }

        return false;

      case "object":
        if (len <= 0) {
          return true;
        }

        return false;

      case "number":
        return false;

      default:
        // for array
        if (Array.isArray(data) && data.length <= 0) {
          return true;
        }

        return false;
    }
  } catch (e) {
    return true;
  }
}

export const isUserLoggedIn = () => {
  const token = loadState(STORAGE_CONSTANTS.TOKEN_SESSION_KEY);

  return !isEmpty(token);
}

/**
 * This method can be used to insert meta tags in any page necessary for SEO.
 *
 * @param {MetaTagsData} dataObject - Data object for meta tags
 * @param {string} web_host - Current domain based on environment .... like - https://groww.in
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getMetaTags(dataObject, config.host); // Use in render method
 * ```
 */
export function getMetaTags(dataObject: MetaTagsData) {
  const title = dataObject.title;
  let desc = dataObject.desc;

  desc = desc.length > 220 ? desc.substring(0, 220) + ' ...' : desc;

  // const featuredImage = dataObject.featuredImage ? dataObject.featuredImage : ZillionLogo;
  // console.log(featuredImage);

  let robots = 'noindex';

  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    robots = 'index';
  }

  if (dataObject.noIndex) {
    robots = 'noindex';
  }

  const routeName = dataObject.routeName;
  const canonicalUrl = dataObject.canonicalUrl ? dataObject.canonicalUrl : routeName;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={robots} />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content={featuredImage} /> */}
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content="_@dodo" />
      <meta name="twitter:creator" content="_@dodo" />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={desc} />
      {/* <meta itemProp="image" content={featuredImage} /> */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {/* <meta property="og:image" content={featuredImage} /> */}
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={routeName} />
      <meta property="og:site_name" content="Dodo" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/png" href={`${process.env.NEXT_PUBLIC_DESKTOP_SITE_BASE_URL}/favicon.ico`} />
      {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.ico" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.ico" />
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.ico" /> */}
    </Helmet>
  );
}

export function capitalizeFirstWord(input: string) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const separateWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_]/g, ' ')
      .split(' ');
  };

  const words = separateWords(input);

  if (words.length > 0) {
    words[0] = capitalize(words[0]);
  }

  return words.join(' ');
}

export const trackEvent = (eventName: string, payload = {}) => {
  if (mixpanel) {
    mixpanel.track(eventName, payload)
  }
}

export const gotoLink = (link: string) => {
  console.log(link)
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = `https://${link}`;
  }

  const newWindow = window.open(link, '_blank', 'noopener,noreferrer');

  if (newWindow) {
    newWindow.opener = null;
  }
};

export const handlePasteFromClipboard = async (cb) => {
  try {
    let text;
    sendToNative('pasteFromClipboard');

    if (window && window.ReactNativeWebView) {
      // Native environment: Listen for messages from native
      const handleMessage = (event) => {
        try {
          const { action, content } = JSON.parse(event.data);
          if (action === 'clipboardContent' && content !== '') {
            cb(content);
          }
        } catch (error) {
          console.error("Failed to process message from native:", error);
        }
      };

      if (isWebview()) {
        document.addEventListener('message', handleMessage);
      }

      return () => {
        if (isWebview()) {
          document.removeEventListener('message', handleMessage);
        }
      };
    } else {
      // Web environment
      text = await navigator.clipboard.readText();
      console.log('Text pasted from web clipboard:', text);
      cb(text);
    }
  } catch (error) {
    console.error("Failed to read clipboard contents: ", error);
  }
};

export const isWebview = () => {
  return window && window.ReactNativeWebView;
}

export const sendToNative = (action: string, payload = {}) => {
  if (window && window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ action, ...payload }));
  } else {
    console.warn('Not in WebView environment');
  }
}

export const handleNativeBackButton = (event: MessageEvent, defaultBack: () => void, onBackClick?: () => void,) => {
  try {
    console.log('Received message on WebView:', event.data)
    const data = JSON.parse(event.data);
    if (data.action === 'backButtonPressed') {
      if (onBackClick) {
        onBackClick();
      } else {
        defaultBack();
      }
    }
  } catch (error) {
    console.error("Failed to parse message data", error);
  }
};

