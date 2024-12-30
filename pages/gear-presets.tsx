import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { GearSetPresets } from "../src/features/gear-set-preset/GearSetPresets";

export default function GearPresetsPage() {
  useEffect(() => {
    db.init(["characters", "gears", "gearSetPresets"]);
  }, []);

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
