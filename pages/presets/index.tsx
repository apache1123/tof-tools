import Head from "next/head";

import { CharacterPresets } from "../../src/features/character/CharacterPresets";
import { useSelectedCharacter } from "../../src/features/character/useSelectedCharacter";

export default function Page() {
  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Presets | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <CharacterPresets characterId={characterId} />}
    </>
  );
}
