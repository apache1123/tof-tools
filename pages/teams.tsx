import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { TeamPresets } from "../src/features/team/TeamPresets";

export default function TeamsPage() {
  const { characterData } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Teams | Tower of Fantasy Tools</title>
      </Head>

      {characterData && <TeamPresets characterId={characterData.id} />}
    </>
  );
}
