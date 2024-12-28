import { EditorModal } from "../../components/common/Modal/EditorModal";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponId } from "../../models/weapon/weapon";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { useMatrices } from "../matrices/useMatrices";
import { WeaponEditor } from "./WeaponEditor";

export interface EditWeaponProps {
  id: WeaponId;
  onFinishEdit?(): void;
}

export function EditWeapon({ id, onFinishEdit }: EditWeaponProps) {
  const weaponRepo = db.get("weapons");
  const weaponProxy = weaponRepo.find(id);

  const { selectedCharacterId } = useSelectedCharacter();
  const { matrixProxies } = useMatrices(selectedCharacterId);

  const weaponPresetRepo = db.get("weaponPresets");
  const weaponPresetProxies = weaponPresetRepo.filter(
    (weaponPreset) => weaponPreset.weaponId === id,
  );

  return (
    weaponProxy && (
      <EditorModal
        modalContent={
          <WeaponEditor
            weaponProxy={weaponProxy}
            allMatrixProxies={matrixProxies}
            weaponPresetProxies={weaponPresetProxies}
            onAddPreset={() => {
              weaponPresetRepo.add(new WeaponPreset(id));
            }}
          />
        }
        open={!!weaponProxy}
        onClose={() => {
          onFinishEdit?.();
        }}
        itemName={weaponProxy.weaponDisplayName}
        showDelete
        onDelete={() => {
          weaponRepo.remove(weaponProxy.id);
          onFinishEdit?.();
        }}
      />
    )
  );
}
