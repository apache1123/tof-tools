import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import type { Gear } from "../../models/gear/gear";
import { GearDetailsInline } from "./GearDetailsInline";

export interface GearDetailsModalProps {
  gearProxy: Gear;
  onClose(): void;
  onDelete(): void;
}

export function GearDetailsModal({
  gearProxy,
  onClose,
  onDelete,
}: GearDetailsModalProps) {
  const gear = useSnapshot(gearProxy);

  return (
    <EditorModal
      open={!!gearProxy}
      modalContent={<GearDetailsInline gearProxy={gearProxy} />}
      itemName={gear.type.displayName}
      onClose={onClose}
      showDelete
      onDelete={onDelete}
    />
  );
}
