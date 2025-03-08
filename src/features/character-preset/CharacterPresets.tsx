import { useState } from "react";

import { CharacterPresetCard } from "../../components/character-preset/CharacterPresetCard/CharacterPresetCard";
import { Button } from "../../components/common/Button/Button";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { db } from "../../db/reactive-local-storage-db";
import type {
  CharacterData,
  CharacterId,
} from "../../models/character/character-data";
import { CharacterPreset } from "../../models/character-preset/character-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { EditCharacterPreset } from "./EditCharacterPreset/EditCharacterPreset";

export interface CharacterPresetsProps {
  characterId: CharacterId;
  characterDataProxy: CharacterData;
}

export function CharacterPresets({
  characterId,
  characterDataProxy,
}: CharacterPresetsProps) {
  const characterPresetRepo = db.get("characterPresets");

  const { items } = useItemsBelongingToCharacter(
    characterPresetRepo,
    characterId,
  );

  const [editingPresetProxy, setEditingPresetProxy] = useState<
    CharacterPreset | undefined
  >(undefined);

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
                setEditingPresetProxy(newPresetProxy);
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
            onClick={() => {
              const presetProxy = characterPresetRepo.find(preset.id);
              if (presetProxy) {
                setEditingPresetProxy(presetProxy);
              }
            }}
          />
        ))}
      />

      {editingPresetProxy && (
        <EditorModal
          open={!!editingPresetProxy}
          modalContent={
            <EditCharacterPreset
              characterPresetProxy={editingPresetProxy}
              characterDataProxy={characterDataProxy}
            />
          }
          modalTitle="Edit preset"
          itemName="this preset"
          onClose={() => {
            setEditingPresetProxy(undefined);
          }}
          showDelete
          onDelete={() => {
            characterPresetRepo.remove(editingPresetProxy.id);
            setEditingPresetProxy(undefined);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
