import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { GearCompare } from "../src/features/gear-compare/GearCompare";
import {
  gearCompareState,
  gearCompareStateKey,
} from "../src/states/gear-compare/gear-compare-state";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";

export default function Page() {
  useLocalStoragePersistence(gearCompareStateKey, gearCompareState);

  const { characterData, characterDataProxy } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Gear Compare | Tower of Fantasy Tools</title>
      </Head>

      {characterData && characterDataProxy && (
        <GearCompare
          characterId={characterData.id}
          characterDataProxy={characterDataProxy}
        />
      )}
    </>
  );
}
