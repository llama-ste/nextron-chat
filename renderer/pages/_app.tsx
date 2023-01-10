import "react-toastify/dist/ReactToastify.css";

import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import createEmotionCache from "../lib/create-emotion-cache";
import theme from "../lib/theme";
import Layout from "../components/Layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";

const clientSideEmotionCache = createEmotionCache();

const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
};

const toastConfig: object = {
  autoClose: 500,
  bodyStyle: { fontSize: "14px" },
  closeButton: true,
  closeOnClick: true,
  limit: 1,
  pauseOnHover: false,
  position: "top-center",
  progressStyle: {
    background: `linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    )`,
  },
  style: {
    maxWidth: "400px",
    width: "max-content",
    zIndex: 1000000,
  },
  theme: "light",
};

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const queryClient = new QueryClient(queryClientOptions);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Nextron Chat</title>
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer {...toastConfig} />
          <CssBaseline />
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
