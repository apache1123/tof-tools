import Grid from "@mui/material/Unstable_Grid2";
import { useSnapshot } from "valtio/index";

import { BaseAttackInput } from "../../../components/character-preset/BaseAttackInput/BaseAttackInput";
import { CritRateFlatInput } from "../../../components/character-preset/CritRateFlatInput/CritRateFlatInput";
import type { CharacterPreset } from "../../../models/character-preset/character-preset";

export interface EditCharacterPresetOverrideStatsProps {
  characterPresetProxy: CharacterPreset;
}

export function EditCharacterPresetOverrideStats({
  characterPresetProxy,
}: EditCharacterPresetOverrideStatsProps) {
  const { teamPreset, baseAttacks, critRateFlat } =
    useSnapshot(characterPresetProxy);

  const mainWeaponDefinition = teamPreset?.getMainWeaponPreset()?.definition;

  return (
    mainWeaponDefinition && (
      <>
        {mainWeaponDefinition.gearResonanceElements.map((element) => (
          <Grid key={element} xs={12} sm={6} md={4} lg={3}>
            <BaseAttackInput
              element={element}
              value={baseAttacks.get(element)}
              onChange={(value) => {
                characterPresetProxy.baseAttacks.set(element, value);
              }}
            />
          </Grid>
        ))}

        <Grid xs={12} sm={6} md={4} lg={3}>
          <CritRateFlatInput
            value={critRateFlat}
            onChange={(value) => {
              characterPresetProxy.critRateFlat = value;
            }}
          />
        </Grid>
      </>
    )
  );
}
