import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { TeamPresets } from "../src/features/team/TeamPresets";

export default function TeamsPage() {
  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Teams | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <TeamPresets characterId={characterId} />}
    </>
  );
}
