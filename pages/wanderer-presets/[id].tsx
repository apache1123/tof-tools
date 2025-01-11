import { useRouter } from "next/router";
import { useEffect } from "react";

import { db } from "../../src/db/reactive-local-storage-db";
import { CharacterPresetEditor } from "../../src/features/character/CharacterPresetEditor";
import { useItemsBelongingToCharacter } from "../../src/features/character/useItemsBelongingToCharacter";
import { useSelectedCharacter } from "../../src/features/character/useSelectedCharacter";
import type { CharacterId } from "../../src/models/character/character-data";

export default function Page() {
  useEffect(() => {
    db.init([
      "characters",
      "gears",
      "gearSetPresets",
      "matrices",
      "weapons",
      "weaponPresets",
      "teamPresets",
      "characterPresets",
    ]);
  }, []);

  const { characterId } = useSelectedCharacter();

  const router = useRouter();
  // Only ../id paths here, no ../id/... paths, so no need to handle string[] type or undefined
  const id = router.query.id as string;

  return (
    characterId && <CharacterPresetPage characterId={characterId} id={id} />
  );
}

function CharacterPresetPage({
  characterId,
  id,
}: {
  characterId: CharacterId;
  id: string;
}) {
  const presetProxy = useItemsBelongingToCharacter(
    db.get("characterPresets"),
    characterId,
  ).itemProxies.find((item) => item.id === id);

  return (
    presetProxy && <CharacterPresetEditor characterPresetProxy={presetProxy} />
  );
}
