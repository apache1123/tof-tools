import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { Weapons } from "../src/features/weapon/Weapons";

export default function WeaponsPage() {
  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Weapons | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <Weapons characterId={characterId} />}
    </>
  );
}
