import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { WeaponPresets } from "../src/features/weapon/WeaponPresets";

export default function WeaponsPage() {
  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Weapons | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <WeaponPresets characterId={characterId} />}
    </>
  );
}
