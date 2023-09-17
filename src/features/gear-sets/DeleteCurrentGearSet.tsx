import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ButtonModal } from '../../components/Modal/ButtonModal';
import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import { gearSetsState } from './states/gear-sets';

export function DeleteCurrentGearSet() {
  const { selectedGearSet } = useSnapshot(gearSetsState);

  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar({});

  if (!selectedGearSet) {
    return null;
  }

  return (
    <>
      <ButtonModal
        icon={<DeleteForeverIcon color="error" />}
        iconButton
        modalTitle="Delete gear set"
        modalContent={
          <Typography color="error">
            This will permanently delete this gear set. Continue?
          </Typography>
        }
        showConfirm
        showCancel
        onConfirm={() => {
          gearSetsState.deleteSelectedGearSet();
          showSnackbar('Gear set deleted');
        }}
        aria-label="delete-gear-set"
      />
      <SnackbarComponent />
    </>
  );
}
