import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";

export default function WandererPage() {
  useEffect(() => {
    db.init([
      "characters",
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
    </>
  );
}
