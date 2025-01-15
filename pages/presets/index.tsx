import Head from "next/head";

import { useSelectedCharacter } from "../../src/features/character/useSelectedCharacter";
import { CharacterPresets } from "../../src/features/character-preset/CharacterPresets";

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
