import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { Matrices } from "../src/features/matrix/Matrices";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";
import { matrixState, matrixStateKey } from "../src/states/matrix/matrix-state";

export default function MatricesPage() {
  useLocalStoragePersistence(matrixStateKey, matrixState);

  const { characterData } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Matrices | Tower of Fantasy Tools</title>
      </Head>

      {characterData && <Matrices characterId={characterData.id} />}
    </>
  );
}
