import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';
import { useState } from 'react';

import { ButtonModal } from '../../components/ButtonModal/ButtonModal';
import type { Gear } from '../../models/gear';
import { copyGear } from '../../models/gear';
import type { GearSet } from '../../models/gear-set';
import { GearSetSelector } from '../GearSetSelector';

export interface SaveGearModalProps {
  gear: Gear;
}

export function SaveGearModal({ gear }: SaveGearModalProps) {
  const [selectedGearSet, setSelectedGearSet] = useState<GearSet>();

  return (
    <ButtonModal
      buttonText="Save gear to gear set"
      modalContent={
        <>
          <Box mb={1}>Save gear to gear set</Box>
          <GearSetSelector
            onGearSetSelect={(gearSet) => setSelectedGearSet(gearSet)}
          />
        </>
      }
      showConfirm
      showCancel
      onConfirm={() => {
        if (selectedGearSet) {
          const replaceeGear = selectedGearSet.gearsByTypeId[gear.typeId];
          if (replaceeGear) {
            copyGear(gear, replaceeGear);
          }
        }
      }}
      iconButtonIcon={<SaveIcon />}
    />
  );
}
