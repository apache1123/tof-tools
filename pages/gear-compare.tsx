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

  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>Gear Compare | Tower of Fantasy Tools</Head>

      {characterId && <GearCompare characterId={characterId} />}
    </>
  );
}
