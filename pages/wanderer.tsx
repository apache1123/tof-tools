import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { CharacterPresets } from "../src/features/character/CharacterPresets";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";

export default function WandererPage() {
  useEffect(() => {
    db.init([
      "characters",
      "gears",
      "gearSetPresets",
      "matrices",
      "weapons",
      "weaponPresets",
      "teamPresets",
      "characterPresets",
    ]);
  }, []);

  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Wanderer | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <CharacterPresets characterId={characterId} />}
    </>
  );
}
