import type {
  WeaponPreset,
  WeaponPresetId,
} from "../../../models/weapon/weapon-preset";
import { CardList } from "../../common/CardList/CardList";
import { WeaponPresetCard } from "../WeaponPresetCard/WeaponPresetCard";

export interface WeaponPresetSelectorProps {
  weaponPresets: WeaponPreset[];
  onSelect(weaponPresetId: WeaponPresetId): void;
}

export function WeaponPresetSelector({
  weaponPresets,
  onSelect,
}: WeaponPresetSelectorProps) {
  return (
    <CardList>
      {weaponPresets.map((weaponPreset) => (
        <WeaponPresetCard
          key={weaponPreset.id}
          weapon={weaponPreset.weapon}
          matrixSlots={weaponPreset.matrixSlots.getSlots()}
          onClick={() => onSelect(weaponPreset.id)}
        />
      ))}
    </CardList>
  );
}
