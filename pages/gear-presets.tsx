import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { GearSetPresets } from "../src/features/gear-set-preset/GearSetPresets";

export default function GearPresetsPage() {
  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Gear Presets | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <GearSetPresets characterId={characterId} />}
    </>
  );
}
