import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ButtonModal } from '../../components/Modal/ButtonModal';
import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import { deleteSelectedGearSet, gearSetsStore } from './stores/gear-sets';

export function DeleteCurrentGearSet() {
  const { selectedGearSet } = useSnapshot(gearSetsStore);

  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar({});

  if (!selectedGearSet) {
    return null;
  }

  return (
    <>
      <ButtonModal
        icon={<DeleteForeverIcon color="error" />}
        iconButton
        modalContent={
          <Typography color="error">
            This will permanently delete this gear set. Continue?
          </Typography>
        }
        showConfirm
        showCancel
        onConfirm={() => {
          deleteSelectedGearSet();
          showSnackbar('Gear set deleted');
        }}
        aria-label="delete-gear-set"
      />
      <SnackbarComponent />
    </>
  );
}
