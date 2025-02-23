import Head from "next/head";

import { useSelectedCharacter } from "../../src/features/character/useSelectedCharacter";
import { CharacterPresets } from "../../src/features/character-preset/CharacterPresets";

export default function Page() {
  const { characterData, characterDataProxy } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Presets | Tower of Fantasy Tools</title>
      </Head>

      {characterData && characterDataProxy && (
        <CharacterPresets
          characterId={characterData.id}
          characterDataProxy={characterDataProxy}
        />
      )}
    </>
  );
}
