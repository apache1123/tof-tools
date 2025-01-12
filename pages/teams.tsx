import Head from "next/head";

import { useSelectedCharacter } from "../src/features/character/useSelectedCharacter";
import { Teams } from "../src/features/team/Teams";

export default function TeamsPage() {
  const { characterId } = useSelectedCharacter();

  return (
    <>
      <Head>
        <title>Teams | Tower of Fantasy Tools</title>
      </Head>

      {characterId && <Teams characterId={characterId} />}
    </>
  );
}
