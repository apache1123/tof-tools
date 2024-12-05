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
import { db } from "../src/db/reactive-local-storage-db";
import { Character } from "../src/models/character/character";
import {
  changelogState,
  changelogStateKey,
} from "../src/states/changelog/changelog";
import {
  characterState,
  characterStateKey,
} from "../src/states/character/character-state";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";
import { migrateStatesToLatestVersion } from "../src/states/migrations/state-migrations-state";
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

  useEffect(() => {
    // Most pages depend on the presence of a character
    db.init(["characters"]);
  }, []);

  useLocalStoragePersistence(changelogStateKey, changelogState);
  useLocalStoragePersistence(characterStateKey, characterState);

  useEffect(() => {
    // Most pages depend on a selected character

    // Add a default character if none exists
    const characterRepo = db.get("characters");
    if (characterRepo.items.length === 0) {
      const defaultCharacter = new Character();
      defaultCharacter.name = "Default wanderer";
      characterRepo.add(defaultCharacter);
    }

    // Set the first character as selected if none are selected
    if (!characterState.selectedId) {
      const characterRepo = db.get("characters");
      const firstCharacter = characterRepo.items[0];
      if (firstCharacter) {
        characterState.selectedId = firstCharacter.id;
      }
    }
  }, []);

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
