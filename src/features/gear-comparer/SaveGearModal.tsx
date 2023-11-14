import SaveIcon from '@mui/icons-material/Save';
import { useCallback, useState } from 'react';

import { ButtonModal } from '../../components/Modal/ButtonModal';
import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import type { Gear } from '../../models/gear';
import type { GearSet } from '../../models/gear-set';
import { GearSetSelector } from '../GearSetSelector';

export interface SaveGearModalProps {
  gear: Gear;
}

export function SaveGearModal({ gear }: SaveGearModalProps) {
  // TODO:
  // const [selectedGearSet, setSelectedGearSet] = useState<GearSet>();

  // const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar();

  // const handleGearSetSelect = useCallback((gearSet: GearSet) => {
  //   setSelectedGearSet(gearSet);
  // }, []);

  // return (
  //   <>
  //     <ButtonModal
  //       buttonText="Save gear to gear set"
  //       modalTitle="Save gear to gear set"
  //       modalContent={<GearSetSelector onGearSetSelect={handleGearSetSelect} />}
  //       showConfirm
  //       showCancel
  //       onConfirm={() => {
  //         if (selectedGearSet) {
  //           const replaceeGear = selectedGearSet.getGearByType(gear.type.id);
  //           if (replaceeGear) {
  //             Gear.copy(gear, replaceeGear);

  //             if (selectedGearSet.name) {
  //               showSnackbar(
  //                 `Gear saved to "${selectedGearSet.name}" gear set`
  //               );
  //             } else {
  //               showSnackbar('Gear saved to gear set');
  //             }
  //           }
  //         }
  //       }}
  //       icon={<SaveIcon />}
  //       iconButton
  //     />
  //     <SnackbarComponent />
  //   </>
  // );

  return null;
}
