import { Box, Card, Stack, TextField } from "@mui/material";
import { useSnapshot } from "valtio";

import { NumericInput } from "../../components/common/NumericInput/NumericInput";
import { maxCharacterLevel } from "../../definitions/character-level";
import type { CharacterData } from "../../models/character/character-data";

export interface CharacterEditorProps {
  characterDataProxy: CharacterData;
}

export function CharacterEditor({ characterDataProxy }: CharacterEditorProps) {
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

        <NumericInput
          id="char-level"
          label="Wanderer level"
          variant="outlined"
          value={level}
          onChange={(value) => {
            characterDataProxy.level = value;
          }}
          helperText={
            level !== maxCharacterLevel ? (
              <Box
                component="span"
                sx={{ color: (theme) => theme.palette.warning.main }}
              >
                Current max wanderer level is {maxCharacterLevel}
              </Box>
            ) : undefined
          }
        />
      </Stack>
    </Card>
  );
}
