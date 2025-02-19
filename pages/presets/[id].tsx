import { Paper } from "@mui/material";
import { useRouter } from "next/router";

import { db } from "../../src/db/reactive-local-storage-db";
import { useSelectedCharacter } from "../../src/features/character/useSelectedCharacter";
import { EditCharacterPreset } from "../../src/features/character-preset/EditCharacterPreset/EditCharacterPreset";
import { useItemsBelongingToCharacter } from "../../src/features/common/useItemsBelongingToCharacter";
import type {
  CharacterData,
  CharacterId,
} from "../../src/models/character/character-data";

export default function Page() {
  const { characterId, characterData, characterDataProxy } =
    useSelectedCharacter();

  const router = useRouter();
  // Only ../id paths here, no ../id/... paths, so no need to handle string[] type or undefined
  const id = router.query.id as string;

  return (
    characterId &&
    characterData &&
    characterDataProxy && (
      <CharacterPresetPage
        characterId={characterId}
        characterDataProxy={characterDataProxy}
        id={id}
      />
    )
  );
}

function CharacterPresetPage({
  characterId,
  characterDataProxy,
  id,
}: {
  characterId: CharacterId;
  characterDataProxy: CharacterData;
  id: string;
}) {
  const presetProxy = useItemsBelongingToCharacter(
    db.get("characterPresets"),
    characterId,
  ).itemProxies.find((item) => item.id === id);

  return (
    presetProxy && (
      <Paper sx={{ p: 3 }}>
        <EditCharacterPreset
          characterPresetProxy={presetProxy}
          characterDataProxy={characterDataProxy}
          expandTeam
          expandGearSet
          expandStats
        />
      </Paper>
    )
  );
}
