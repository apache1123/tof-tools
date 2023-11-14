import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { useEffect } from 'react';

import createEmotionCache from '../src/createEmotionCache';
import {
  gearComparerGearsState,
  gearComparerGearsStateKey,
} from '../src/features/gear-comparer/states/gear-comparer-gear';
import {
  gearComparerOptionsState,
  gearComparerOptionsStateKey,
} from '../src/features/gear-comparer/states/gear-comparer-options';
import {
  userStatsState,
  userStatsStateKey,
} from '../src/features/gear-comparer/states/user-stats/user-stats';
import { useLocalStoragePersistence } from '../src/states/hooks/useLocalStoragePersistence';
import { loadoutsState, loadoutsStateKey } from '../src/states/loadouts';
import { migrateStatesToLatestVersion } from '../src/states/migrations/state-migrations-state';
import theme from '../src/theme';
import Layout from './_layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  useEffect(() => {
    migrateStatesToLatestVersion();
  });

  // Order matters here.
  // Not 100% sure, but I think there is a bug in `derive`
  // https://github.com/pmndrs/valtio/issues/687
  useLocalStoragePersistence(loadoutsState, loadoutsStateKey);
  useLocalStoragePersistence(userStatsState, userStatsStateKey);
  useLocalStoragePersistence(
    gearComparerOptionsState,
    gearComparerOptionsStateKey
  );
  useLocalStoragePersistence(gearComparerGearsState, gearComparerGearsStateKey);

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
