import Head from "next/head";

import { CharacterEditor } from "../src/features/character/CharacterEditor";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";

export default function Page() {
  const { characterDataProxy } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Wanderer | Tower of Fantasy Tools</title>
      </Head>

      {characterDataProxy && (
        <CharacterEditor characterDataProxy={characterDataProxy} />
      )}
    </>
  );
}
