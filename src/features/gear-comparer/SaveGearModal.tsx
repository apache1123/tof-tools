import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';
import { useCallback, useState } from 'react';

import { ButtonModal } from '../../components/Modal/ButtonModal';
import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import type { Gear } from '../../models/gear';
import { copyGear } from '../../models/gear';
import type { GearSet } from '../../models/gear-set';
import { GearSetSelector } from '../GearSetSelector';

export interface SaveGearModalProps {
  gear: Gear;
}

export function SaveGearModal({ gear }: SaveGearModalProps) {
  const [selectedGearSet, setSelectedGearSet] = useState<GearSet>();

  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar({});

  const handleGearSetSelect = useCallback((gearSet: GearSet) => {
    setSelectedGearSet(gearSet);
  }, []);

  return (
    <>
      <ButtonModal
        buttonText="Save gear to gear set"
        modalContent={
          <>
            <Box mb={1}>Save gear to gear set</Box>
            <GearSetSelector onGearSetSelect={handleGearSetSelect} />
          </>
        }
        showConfirm
        showCancel
        onConfirm={() => {
          if (selectedGearSet) {
            const replaceeGear = selectedGearSet.gearsByTypeId[gear.typeId];
            if (replaceeGear) {
              copyGear(gear, replaceeGear);

              if (selectedGearSet.name) {
                showSnackbar(
                  `Gear saved to "${selectedGearSet.name}" gear set`
                );
              } else {
                showSnackbar('Gear saved to gear set');
              }
            }
          }
        }}
        iconButtonIcon={<SaveIcon />}
      />
      <SnackbarComponent />
    </>
  );
}
