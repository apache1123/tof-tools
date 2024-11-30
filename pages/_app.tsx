import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import BigNumber from "bignumber.js";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { useEffect } from "react";

import createEmotionCache from "../src/createEmotionCache";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";
import { migrateStatesToLatestVersion } from "../src/states/migrations/state-migrations-state";
import {
  changelogState,
  changelogStateKey,
  charactersState,
  charactersStateKey,
  gearsState,
  gearsStateKey,
  matricesState,
  matricesStateKey,
  weaponsState,
  weaponsStateKey,
} from "../src/states/states";
import theme from "../src/theme";
import Layout from "./_layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  useEffect(() => {
    migrateStatesToLatestVersion();
  });

  useLocalStoragePersistence(changelogState, changelogStateKey);
  useLocalStoragePersistence(charactersState, charactersStateKey);
  useLocalStoragePersistence(gearsState, gearsStateKey);
  useLocalStoragePersistence(weaponsState, weaponsStateKey);
  useLocalStoragePersistence(matricesState, matricesStateKey);
  // useLocalStoragePersistence(relicsState, relicsStateKey);

  BigNumber.config({ DECIMAL_PLACES: 4 });

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
