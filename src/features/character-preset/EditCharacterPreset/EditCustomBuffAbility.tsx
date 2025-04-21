import { Box, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio";

import { ElementalBuffInput } from "../../../components/character-preset/ElementalBuffInput/ElementalBuffInput";
import { DeleteButtonWithConfirm } from "../../../components/common/DeleteButtonWithConfirm/DeleteButtonWithConfirm";
import { NumericInput } from "../../../components/common/NumericInput/NumericInput";
import type { BuffAbilityDefinition } from "../../../definitions/types/buff/buff-ability-definition";
import type { ElementalBuffDefinition } from "../../../definitions/types/buff/elemental-buff-definition";
import type { ElementalDamageBuffDefinition } from "../../../definitions/types/buff/elemental-damage-buff-definition";

export interface EditCustomBuffAbilityProps {
  abilityProxy: BuffAbilityDefinition;
  onDelete(): void;
}

// Only support one of each type of buff, and only add the buff if it has a non-zero value
export function EditCustomBuffAbility({
  abilityProxy,
  onDelete,
}: EditCustomBuffAbilityProps) {
  const ability = useSnapshot(abilityProxy) as BuffAbilityDefinition;
  const { displayName } = ability;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <TextField
        label="Buff name"
        value={displayName}
        onChange={(e) => {
          abilityProxy.displayName = e.target.value;
        }}
        sx={{ mt: 1 }}
      />

      <Grid container columnSpacing={4} rowSpacing={3} sx={{ mt: 3 }}>
        <Grid>
          <EditElementalBuff
            abilityProxy={abilityProxy}
            ability={ability}
            label="Attack %"
            property="attackPercentBuffs"
            percentageMode
            helperText="e.g. Supercomputing Evolution, Enhanced Blade Shot, wine food buff"
          />
        </Grid>

        <Grid>
          <EditElementalBuff
            abilityProxy={abilityProxy}
            ability={ability}
            label="Gear elemental damage %"
            property="elementalDamageBuffs"
            percentageMode
            helperText="Gear damage category only. E.g. Supercomputing Evolution"
          />
        </Grid>

        <Grid>
          <EditElementalBuff
            abilityProxy={abilityProxy}
            ability={ability}
            label="Base attack"
            property="baseAttackBuffs"
            percentageMode={false}
            helperText="e.g. Adrenalin Serum (mentor shop) buff"
          />
        </Grid>
      </Grid>

      <Grid container spacing={0.5} sx={{ mt: 3 }}>
        <Grid>
          <EditBuff
            abilityProxy={abilityProxy}
            ability={ability}
            label="Crit rate %"
            property="critRateBuffs"
          />
        </Grid>

        <Grid>
          <EditBuff
            abilityProxy={abilityProxy}
            ability={ability}
            label="Crit damage %"
            property="critDamageBuffs"
          />
        </Grid>
      </Grid>

      <DeleteButtonWithConfirm itemName={displayName} onDelete={onDelete} />
    </Paper>
  );
}

function EditElementalBuff({
  abilityProxy,
  ability,
  label,
  property,
  percentageMode,
  helperText,
}: {
  abilityProxy: BuffAbilityDefinition;
  ability: BuffAbilityDefinition;
  label: string;
  property: keyof Pick<
    BuffAbilityDefinition,
    "baseAttackBuffs" | "attackPercentBuffs" | "elementalDamageBuffs"
  >;
  percentageMode: boolean;
  helperText?: string;
}) {
  return (
    <Box>
      <ElementalBuffInput
        buff={ability[property]?.[0]}
        percentageMode={percentageMode}
        onChange={(buff) => {
          const { elementalTypes, value } = buff;
          if (value) {
            const buff:
              | ElementalBuffDefinition
              | ElementalDamageBuffDefinition =
              property === "elementalDamageBuffs"
                ? // only support the gear elemental damage buff
                  { elementalTypes, value, source: "gear" }
                : { elementalTypes, value };

            abilityProxy[property] = [
              // @ts-expect-error source applies to elementalDamageBuff
              buff,
            ];
          } else {
            abilityProxy[property] = [];
          }
        }}
        label={label}
        helperText={helperText}
      />
    </Box>
  );
}

function EditBuff({
  abilityProxy,
  ability,
  label,
  property,
}: {
  abilityProxy: BuffAbilityDefinition;
  ability: BuffAbilityDefinition;
  label: string;
  property: keyof Pick<
    BuffAbilityDefinition,
    "critRateBuffs" | "critDamageBuffs"
  >;
}) {
  return (
    <Box sx={{ width: 170 }}>
      <NumericInput
        value={ability[property]?.[0]?.value ?? 0}
        percentageMode
        onChangeCommitted={(value) => {
          if (value) {
            abilityProxy[property] = [{ value }];
          } else {
            abilityProxy[property] = [];
          }
        }}
        label={label}
      />
    </Box>
  );
}
