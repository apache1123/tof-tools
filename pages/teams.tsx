import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { Teams } from "../src/features/team/Teams";

export default function TeamsPage() {
  useEffect(() => {
    db.init([
      "characters",
      "matrices",
      "weapons",
      "weaponPresets",
      "teamPresets",
    ]);
  }, []);

  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Teams | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <Teams characterId={characterId} />}
    </>
  );
}
