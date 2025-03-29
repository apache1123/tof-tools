import { Stack } from "@mui/material";

import { InfoText } from "../../components/common/Text/InfoText";
import { WeaponDefinitionCardContent } from "../../components/weapon/WeaponDefinitionCard/WeaponDefinitionCardContent";
import { WeaponStarsSelector } from "../../components/weapon/WeaponStarsSelector/WeaponStarsSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../models/character/character-data";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";

export interface EditWeaponPresetGroupCommonProps {
  characterId: CharacterId;
  weaponDefinitionId: WeaponDefinitionId;
}

/** Edit common properties of all weapon presets with the same weapon definition and belonging to the same character */
export function EditWeaponPresetGroupCommon({
  characterId,
  weaponDefinitionId,
}: EditWeaponPresetGroupCommonProps) {
  const { items, itemProxies } = useItemsBelongingToCharacter(
    db.get("weaponPresets"),
    characterId,
  );

  const filterByDefinition = (weaponPreset: WeaponPreset) =>
    weaponPreset.definition.id === weaponDefinitionId;

  const weaponPresets = items.filter(filterByDefinition);
  const weaponPresetProxies = itemProxies.filter(filterByDefinition);

  if (weaponPresets.length === 0) {
    return null;
  }

  const {
    id,
    weaponDisplayName,
    simulacrumDisplayName,
    iconWeaponId,
    elementalIcon,
    type,
  } = weaponPresets[0].definition;
  const { stars } = weaponPresets[0];

  return (
    <Stack sx={{ gap: 1 }}>
      <Stack sx={{ alignItems: "center" }}>
        <WeaponDefinitionCardContent
          id={id}
          weaponDisplayName={weaponDisplayName}
          simulacrumDisplayName={simulacrumDisplayName}
          iconWeaponId={iconWeaponId}
          elementalIcon={elementalIcon}
          type={type}
          iconSize={120}
        />
        <WeaponStarsSelector
          stars={stars}
          onStarsChange={(value) => {
            // Update all weapon presets with the same definition
            for (const weaponPresetProxy of weaponPresetProxies) {
              weaponPresetProxy.stars = value;
            }
          }}
        />
      </Stack>

      <InfoText>
        Changes to the weapon star will apply to all presets of this weapon
      </InfoText>
    </Stack>
  );
}
