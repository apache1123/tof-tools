import { WeaponEditorModal } from "../../components/mutational/weapon/WeaponEditorModal/WeaponEditorModal";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponId } from "../../models/weapon/weapon";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { useMatrices } from "../matrices/useMatrices";

export interface EditWeaponProps {
  id: WeaponId;
  onFinishEdit?(): void;
}

export function EditWeapon({ id, onFinishEdit }: EditWeaponProps) {
  const weaponRepo = db.get("weapons");
  const weaponProxy = weaponRepo.find(id);

  const { selectedCharacterId } = useSelectedCharacter();
  const { matricesProxy } = useMatrices(selectedCharacterId);

  return (
    weaponProxy && (
      <WeaponEditorModal
        open={!!weaponProxy}
        onClose={() => {
          onFinishEdit?.();
        }}
        weaponProxy={weaponProxy}
        allMatricesProxy={matricesProxy}
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
