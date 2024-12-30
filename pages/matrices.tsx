import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { Matrices } from "../src/features/matrix/Matrices";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";
import { matrixState, matrixStateKey } from "../src/states/matrix/matrix-state";

export default function MatricesPage() {
  useEffect(() => {
    db.init(["characters", "matrices", "weapons"]);
  }, []);

  useLocalStoragePersistence(matrixStateKey, matrixState);

  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Matrices | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <Matrices characterId={characterId} />}
    </>
  );
}
