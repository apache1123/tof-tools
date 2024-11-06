import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Typography } from "@mui/material";
import { useSnapshot } from "valtio";

import { ButtonModal } from "../../components/Modal/ButtonModal";
import { useAutoHideSnackbar } from "../../components/Snackbar/useAutoHideSnackbar";
import { loadoutsState } from "../../states/states";

export function DeleteLoadout() {
  const {
    selectedLoadoutItem: { isDefault },
  } = useSnapshot(loadoutsState);

  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar();

  return (
    <>
      <ButtonModal
        disabled={isDefault}
        icon={<DeleteForeverIcon color="error" />}
        iconButton
        modalTitle="Delete loadout"
        modalContent={
          <Typography color="error">
            This will permanently delete this loadout. Continue?
          </Typography>
        }
        showConfirm
        showCancel
        hideClose
        onConfirm={() => {
          loadoutsState.deleteSelectedLoadout();
          showSnackbar("Loadout deleted");
        }}
        aria-label="delete-loadout"
      />
      <SnackbarComponent />
    </>
  );
}
