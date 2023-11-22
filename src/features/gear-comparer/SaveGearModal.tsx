import SaveIcon from '@mui/icons-material/Save';
import { useCallback, useState } from 'react';

import { ButtonModal } from '../../components/Modal/ButtonModal';
import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import { Gear } from '../../models/gear';
import type { GearSet } from '../../models/gear-set';
import { Loadout } from '../../models/loadout';

export interface SaveGearModalProps {
  gear: Gear;
  targetLoadout: Loadout;
}

export function SaveGearModal({ gear, targetLoadout }: SaveGearModalProps) {
  // TODO: show message of Loadout stats being updated
  return (
    <>
      <ButtonModal
        buttonText="Replace gear in loadout"
        modalContent="Replace the current loadout's gear with this gear?"
        showConfirm
        showCancel
        onConfirm={() => {
          const newGear = new Gear(gear.type);
          Gear.copy(gear, newGear);
          targetLoadout.replaceGear(newGear);
        }}
        icon={<SaveIcon />}
        iconButton
      />
      {/* <SnackbarComponent /> */}
    </>
  );
}
