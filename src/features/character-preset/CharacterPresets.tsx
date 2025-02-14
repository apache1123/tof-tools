import { useRouter } from "next/router";

import { routes } from "../../../routes/routes";
import { CharacterPresetCard } from "../../components/character-preset/CharacterPresetCard/CharacterPresetCard";
import { Button } from "../../components/common/Button/Button";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { CharacterPresetId } from "../../models/character/character-preset";
import { CharacterPreset } from "../../models/character/character-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";

export interface CharacterPresetsProps {
  characterId: CharacterId;
}

export function CharacterPresets({ characterId }: CharacterPresetsProps) {
  const characterPresetRepo = db.get("characterPresets");

  const { items } = useItemsBelongingToCharacter(
    characterPresetRepo,
    characterId,
  );

  const router = useRouter();

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <Button
            buttonProps={{ variant: "contained" }}
            onClick={() => {
              const newPreset = new CharacterPreset(characterId);
              newPreset.name = "Preset name";
              characterPresetRepo.add(newPreset);

              const newPresetProxy = characterPresetRepo.find(newPreset.id);
              if (newPresetProxy) {
                router.push(getPresetPagePath(newPresetProxy.id));
              }
            }}
          >
            Add preset
          </Button>
        }
        items={items.map((preset) => (
          <CharacterPresetCard
            key={preset.id}
            characterPreset={preset}
            href={getPresetPagePath(preset.id)}
          />
        ))}
      />
    </>
  );
}

function getPresetPagePath(id: CharacterPresetId) {
  return `${routes.presets.path}/${id}`;
}
