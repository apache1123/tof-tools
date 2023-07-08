import type { Theme } from '@mui/material';
import { Button, Modal, Paper, type SxProps } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import type { ReactNode } from 'react';
import { useState } from 'react';

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

interface ButtonModal {
  buttonText: ReactNode;
  modalContent: ReactNode;
  showConfirm?: boolean;
  showCancel?: boolean;
  isConfirmDisabled?: boolean;
  onConfirm?(): void;
  onClose?(): void;
  buttonSx?: SxProps<Theme>;
  ariaModalTitle?: string;
  ariaModalDescription?: string;
}

export function ButtonModal({
  buttonText,
  modalContent,
  showConfirm,
  showCancel,
  isConfirmDisabled,
  onConfirm,
  onClose,
  buttonSx,
  ariaModalTitle = 'modal-title',
  ariaModalDescription = 'modal-description',
}: ButtonModal) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} variant="text" sx={buttonSx}>
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
                  onClick={handleConfirm}
                  disabled={isConfirmDisabled}
                  variant="contained"
                >
                  Confirm
                </Button>
              )}
              {showCancel && (
                <Button onClick={handleClose} variant="outlined" sx={{ ml: 1 }}>
                  Cancel
                </Button>
              )}
            </Grid>
            <Grid xs></Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
