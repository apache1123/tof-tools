import Head from "next/head";

import { EditCharacter } from "../src/features/character/EditCharacter";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";

export default function Page() {
  const { characterData, characterDataProxy } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Wanderer | Tower of Fantasy Tools</title>
      </Head>

      {characterData && characterDataProxy && (
        <EditCharacter characterDataProxy={characterDataProxy} />
      )}
    </>
  );
}
