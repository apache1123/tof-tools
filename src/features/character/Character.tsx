import { useState } from "react";

import { CharacterPresetCard } from "../../components/character/CharacterPresetCard/CharacterPresetCard";
import { Button } from "../../components/common/Button/Button";
import { EditorModal } from "../../components/common/Modal/EditorModal";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import { CharacterPreset } from "../../models/character/character-preset";
import { InventoryLayout } from "../common/InventoryLayout";
import { CharacterPresetEditor } from "./CharacterPresetEditor";
import { useCharacterPresets } from "./useCharacterPresets";

export interface CharacterProps {
  characterId: CharacterId;
}

export function Character({ characterId }: CharacterProps) {
  const characterPresetRepo = db.get("characterPresets");

  const presets = useCharacterPresets(characterId);
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
              newPreset.name = "Character preset name";
              characterPresetRepo.add(newPreset);

              const newPresetProxy = characterPresetRepo.find(newPreset.id);
              setEditingPresetProxy(newPresetProxy);
            }}
          >
            Add preset
          </Button>
        }
        items={presets.map((preset) => (
          <CharacterPresetCard
            key={preset.id}
            characterPreset={preset}
            onClick={() => {
              const presetProxy = db.get("characterPresets").find(preset.id);
              if (!presetProxy) throw new Error("Character preset not found");

              setEditingPresetProxy(presetProxy);
            }}
          />
        ))}
      />

      {editingPresetProxy && (
        <EditorModal
          modalContent={
            <CharacterPresetEditor characterPresetProxy={editingPresetProxy} />
          }
          open={!!editingPresetProxy}
          itemName={editingPresetProxy.name || "Character preset"}
          onClose={() => setEditingPresetProxy(undefined)}
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
