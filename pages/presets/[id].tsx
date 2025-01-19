import { useRouter } from "next/router";

import { db } from "../../src/db/reactive-local-storage-db";
import { useItemsBelongingToCharacter } from "../../src/features/character/useItemsBelongingToCharacter";
import { useSelectedCharacter } from "../../src/features/character/useSelectedCharacter";
import { EditCharacterPreset } from "../../src/features/character-preset/EditCharacterPreset";
import type { CharacterId } from "../../src/models/character/character-data";

export default function Page() {
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
    presetProxy && <EditCharacterPreset characterPresetProxy={presetProxy} />
  );
}
