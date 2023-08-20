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
  buffsState,
  buffsStateKey,
} from '../src/features/gear-comparer/states/buffs';
import {
  gearComparerGearsState,
  gearComparerGearsStateKey,
} from '../src/features/gear-comparer/states/gear-comparer-gear';
import {
  gearComparerOptionsState,
  gearComparerOptionsStateKey,
} from '../src/features/gear-comparer/states/gear-comparer-options';
import {
  teamsState,
  teamsStateKey,
} from '../src/features/gear-comparer/states/teams';
import { migrations as userStatsMigrations } from '../src/features/gear-comparer/states/user-stats/migrations';
import {
  userStatsState,
  userStatsStateKey,
} from '../src/features/gear-comparer/states/user-stats/user-stats';
import {
  gearSetsState,
  gearSetsStateKey,
} from '../src/features/gear-sets/states/gear-sets';
import { useLocalStoragePersistence } from '../src/states/hooks/useLocalStoragePersistence';
import theme from '../src/theme';
import Layout from './_layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  // Order matters here.
  // Not 100% sure, but the theory is: if in a derived state, get(A) is used before get(B), then A needs to go after B here
  // Cause: maybe because of the Object.assign in `useLocalStoragePersistence` messing up proxy dependents tracking, in nested objects?
  useLocalStoragePersistence(teamsState, teamsStateKey);
  useLocalStoragePersistence(
    userStatsState,
    userStatsStateKey,
    userStatsMigrations
  );
  useLocalStoragePersistence(buffsState, buffsStateKey);
  useLocalStoragePersistence(
    gearComparerOptionsState,
    gearComparerOptionsStateKey
  );
  useLocalStoragePersistence(gearComparerGearsState, gearComparerGearsStateKey);
  useLocalStoragePersistence(gearSetsState, gearSetsStateKey);

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
