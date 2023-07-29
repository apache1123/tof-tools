import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';

import createEmotionCache from '../src/createEmotionCache';
import {
  buffsStore,
  buffsStoreKey,
} from '../src/features/gear-comparer/stores/buffs';
import {
  gearComparerGearsStore,
  gearComparerGearsStoreKey,
} from '../src/features/gear-comparer/stores/gear-comparer-gear';
import {
  gearComparerOptionsStore,
  gearComparerOptionsStoreKey,
} from '../src/features/gear-comparer/stores/gear-comparer-options';
import { migrations as userStatsMigrations } from '../src/features/gear-comparer/stores/user-stats/migrations';
import {
  userStatsStore,
  userStatsStoreKey,
} from '../src/features/gear-comparer/stores/user-stats/user-stats';
import {
  gearSetsStore,
  gearSetsStoreKey,
} from '../src/features/gear-sets/stores/gear-sets';
import { useLocalStoragePersistence } from '../src/stores/hooks/useLocalStoragePersistence';
import theme from '../src/theme';
import Layout from './_layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  // Order matters here.
  // Not 100% sure, but the theory is: if in a derived store, get(A) is used before get(B), then A needs to go after B here
  // Cause: maybe because of the Object.assign in `useLocalStoragePersistence` messing up proxy dependents tracking, in nested objects?
  useLocalStoragePersistence(
    userStatsStore,
    userStatsStoreKey,
    userStatsMigrations
  );
  useLocalStoragePersistence(buffsStore, buffsStoreKey);
  useLocalStoragePersistence(
    gearComparerOptionsStore,
    gearComparerOptionsStoreKey
  );
  useLocalStoragePersistence(gearComparerGearsStore, gearComparerGearsStoreKey);
  useLocalStoragePersistence(gearSetsStore, gearSetsStoreKey);

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
