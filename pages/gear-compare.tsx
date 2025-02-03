import Head from "next/head";
import { useSnapshot } from "valtio";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { GearCompare } from "../src/features/gear-compare/GearCompare";
import type { CharacterData } from "../src/models/character/character-data";
import {
  gearCompareState,
  gearCompareStateKey,
} from "../src/states/gear-compare/gear-compare-state";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";

export default function Page() {
  useLocalStoragePersistence(gearCompareStateKey, gearCompareState);

  const { characterId, characterDataProxy } = useSelectedCharacter();

  return (
    <>
      <Head>Gear Compare | Tower of Fantasy Tools</Head>

      {characterId && characterDataProxy && (
        <Inner
          characterId={characterId}
          characterDataProxy={characterDataProxy}
        />
      )}
    </>
  );

  function Inner({
    characterId,
    characterDataProxy,
  }: {
    characterId: string;
    characterDataProxy: CharacterData;
  }) {
    const characterData = useSnapshot(characterDataProxy) as CharacterData;

    return (
      <GearCompare characterId={characterId} characterData={characterData} />
    );
  }
}
