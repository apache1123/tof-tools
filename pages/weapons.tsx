import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { WeaponPresets } from "../src/features/weapon/WeaponPresets";

export default function WeaponsPage() {
  const { characterData } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Weapons | Tower of Fantasy Tools</title>
      </Head>

      {characterData && <WeaponPresets characterId={characterData.id} />}
    </>
  );
}
