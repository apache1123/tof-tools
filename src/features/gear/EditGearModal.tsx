import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import type { Gear } from "../../models/gear/gear";
import { EditGearInline } from "./EditGearInline";

export interface EditGearModalProps {
  gearProxy: Gear;
  onClose(): void;
  onDelete(): void;
}

export function EditGearModal({
  gearProxy,
  onClose,
  onDelete,
}: EditGearModalProps) {
  const gear = useSnapshot(gearProxy);

  return (
    <EditorModal
      open={!!gearProxy}
      modalContent={<EditGearInline gearProxy={gearProxy} />}
      itemName={gear.type.displayName}
      onClose={onClose}
      showDelete
      onDelete={onDelete}
    />
  );
}
