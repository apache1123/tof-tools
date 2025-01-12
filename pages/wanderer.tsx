import Head from "next/head";

import { CharacterPresets } from "../src/features/character/CharacterPresets";
import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";

export default function WandererPage() {
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
