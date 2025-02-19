import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { Gears } from "../src/features/gear/Gears";
import { gearState, gearStateKey } from "../src/states/gear/gear-state";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";

export default function GearPage() {
  useLocalStoragePersistence(gearStateKey, gearState);

  const { characterData } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Gear | Tower of Fantasy Tools</title>
      </Head>

      {characterData && <Gears characterId={characterData.id} />}
    </>
  );
}
