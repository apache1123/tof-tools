import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Typography } from "@mui/material";

import { ButtonModal } from "../Modal/ButtonModal";

export interface DeleteButtonWithConfirmProps {
  /** e.g. "This will permanently delete [itemName]. Continue?" */
  itemName: string;
  onDelete(): void;
}

export function DeleteButtonWithConfirm({
  itemName,
  onDelete,
}: DeleteButtonWithConfirmProps) {
  return (
    <ButtonModal
      buttonText="Delete"
      icon={<DeleteForeverIcon />}
      buttonProps={{ color: "error" }}
      modalContent={
        <Typography>
          This will permanently delete&nbsp;
          <Typography
            component="span"
            sx={{
              color: (theme) => theme.palette.error.main,
              fontWeight: "bold",
            }}
          >
            {itemName}
          </Typography>
          . Continue?
        </Typography>
      }
      showConfirm
      confirmButtonProps={{ color: "error" }}
      showCancel
      cancelButtonProps={{ color: "error" }}
      onConfirm={onDelete}
    />
  );
}
