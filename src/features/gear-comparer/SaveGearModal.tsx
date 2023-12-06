import { ButtonModal } from '../../components/Modal/ButtonModal';
import { Gear } from '../../models/gear';
import type { Loadout } from '../../models/loadout';

export interface SaveGearModalProps {
  gear: Gear;
  targetLoadout: Loadout;
}

export function SaveGearModal({ gear, targetLoadout }: SaveGearModalProps) {
  return (
    <>
      <ButtonModal
        buttonText="Replace gear in loadout"
        modalTitle="Replace the current loadout's gear with the new gear?"
        modalContent="This loadout's stats will also be automatically adjusted to reflect the new gear."
        showConfirm
        showCancel
        hideClose
        onConfirm={() => {
          const newGear = new Gear(gear.type);
          Gear.copy(gear, newGear);
          targetLoadout.replaceGear(newGear);
        }}
      />
    </>
  );
}
