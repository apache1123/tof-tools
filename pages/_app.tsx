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
import { CharacterData } from "../src/models/character/character-data";
import { CharacterPreset } from "../src/models/character/character-preset";
import { GearSetPreset } from "../src/models/gear/gear-set-preset";
import { TeamPreset } from "../src/models/team/team-preset";
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
    db.init([
      "characters",
      "gears",
      "gearSetPresets",
      "matrices",
      "weaponPresets",
      "teamPresets",
      "characterPresets",
    ]);
  }, []);

  useLocalStoragePersistence(changelogStateKey, changelogState);
  useLocalStoragePersistence(characterStateKey, characterState);

  useEffect(() => {
    // Most pages depend on a selected character

    // Add a default character if none exists. Also add a default gear preset, team preset, and character preset along with it to aid new users
    const characterRepo = db.get("characters");
    if (characterRepo.items.length === 0) {
      const defaultCharacter = new CharacterData();
      defaultCharacter.name = "Default wanderer";
      characterRepo.add(defaultCharacter);

      const gearSetPreset = new GearSetPreset(defaultCharacter.id);
      gearSetPreset.name = "Default gear preset";
      db.get("gearSetPresets").add(gearSetPreset);

      const teamPreset = new TeamPreset(defaultCharacter.id);
      teamPreset.name = "Default team";
      db.get("teamPresets").add(teamPreset);

      const characterPreset = new CharacterPreset(defaultCharacter.id);
      characterPreset.name = "Default preset";
      characterPreset.gearSetPreset = gearSetPreset;
      characterPreset.teamPreset = teamPreset;
      db.get("characterPresets").add(characterPreset);
    }

    // Set the first character as selected if none are selected, or the selected id is invalid
    if (
      !characterState.selectedId ||
      !characterRepo.find(characterState.selectedId)
    ) {
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
