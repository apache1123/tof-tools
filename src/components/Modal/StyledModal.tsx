import type { SxProps } from '@mui/material';
import { Button, Modal, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import type { ReactNode } from 'react';

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export interface StyledModalProps {
  open: boolean;
  modalContent?: ReactNode;
  showConfirm?: boolean;
  showCancel?: boolean;
  isConfirmDisabled?: boolean;
  onConfirm?(): void;
  onClose?(): void;
  ariaModalTitle?: string;
  ariaModalDescription?: string;
}

export function StyledModal({
  open,
  modalContent,
  showConfirm,
  showCancel,
  isConfirmDisabled,
  onConfirm,
  onClose,
  ariaModalTitle,
  ariaModalDescription,
}: StyledModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaModalTitle}
      aria-describedby={ariaModalDescription}
    >
      <Paper sx={modalStyle} elevation={0}>
        {modalContent}

        <Grid container mt={3}>
          <Grid xs></Grid>
          <Grid xs={12} sm="auto">
            {showConfirm && (
              <Button
                onClick={onConfirm}
                disabled={isConfirmDisabled}
                variant="contained"
              >
                Confirm
              </Button>
            )}
            {showCancel && (
              <Button onClick={onClose} variant="outlined" sx={{ ml: 1 }}>
                Cancel
              </Button>
            )}
          </Grid>
          <Grid xs></Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
