import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useSnapshot } from "valtio";

import type { PropsWithSx } from "../../../components/__helpers__/props-with-sx";
import { Button } from "../../../components/common/Button/Button";
import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { EditCustomBuffAbility } from "./EditCustomBuffAbility";

export interface EditCharacterPresetCustomBuffsProps extends PropsWithSx {
  characterPresetProxy: CharacterPreset;
}

export function EditCharacterPresetCustomBuffs({
  characterPresetProxy,
  sx,
}: EditCharacterPresetCustomBuffsProps) {
  const { customBuffAbilities } = useSnapshot(characterPresetProxy);

  return (
    <Accordion elevation={2} sx={sx}>
      <AccordionSummary>
        Custom buffs (advanced)
        {!!customBuffAbilities.length && (
          <Chip
            label={customBuffAbilities.length}
            color="primary"
            size="small"
            sx={{ ml: 1 }}
          />
        )}
      </AccordionSummary>

      <AccordionDetails>
        <Typography sx={{ mb: 2 }}>
          Add any buffs here that you know will affect gear comparison
          calculations, but are not already included in the calculator. E.g.
          Supercomputing evolution, food buffs etc.
        </Typography>

        <Stack sx={{ gap: 2 }}>
          {customBuffAbilities.map((ability, i) => {
            const abilityProxy = characterPresetProxy.customBuffAbilities[i];

            return (
              <EditCustomBuffAbility
                key={ability.id}
                abilityProxy={abilityProxy}
                onDelete={() => {
                  characterPresetProxy.customBuffAbilities.splice(i, 1);
                }}
              />
            );
          })}
        </Stack>

        <Button
          onClick={() => {
            characterPresetProxy.customBuffAbilities.push({
              id: `custom-buff-${nanoid()}`,
              displayName: "Custom buff",
              cooldown: 0,
              requirements: {},
              canBePlayerTriggered: false,
              triggeredBy: {},
              maxStacks: 1,
            });
          }}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
