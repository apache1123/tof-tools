import { Card, Stack, TextField } from "@mui/material";
import { useSnapshot } from "valtio";

import { CharacterLevelInput } from "../../components/character/CharacterLevelInput/CharacterLevelInput";
import type { CharacterData } from "../../models/character/character-data";

export interface EditCharacterProps {
  characterDataProxy: CharacterData;
}

export function EditCharacter({ characterDataProxy }: EditCharacterProps) {
  const characterData = useSnapshot(characterDataProxy);
  const { name, level } = characterData;

  return (
    <Card sx={{ p: 3 }}>
      <Stack sx={{ gap: 3 }}>
        <TextField
          label="Wanderer name"
          value={name}
          onChange={(e) => {
            characterDataProxy.name = e.target.value;
          }}
        />

        <CharacterLevelInput
          value={level}
          onChange={(value) => {
            characterDataProxy.level = value;
          }}
        />
      </Stack>
    </Card>
  );
}
