import type { AlertColor } from '@mui/material';
import { Alert, Snackbar } from '@mui/material';
import type { ReactNode } from 'react';
import { useState } from 'react';

export interface useAutoHideSnackbarOptions {
  severity?: AlertColor;
  autoHideDuration?: AutoHideDuration;
}

export enum AutoHideDuration {
  Short = 3000,
  Long = 5000,
}

export function useAutoHideSnackbar({
  severity = 'success',
  autoHideDuration = AutoHideDuration.Short,
}: useAutoHideSnackbarOptions) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ReactNode>(undefined);

  function show(message: ReactNode) {
    setMessage(message);
    setOpen(true);
  }

  function SnackbarComponent() {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return {
    SnackbarComponent,
    showSnackbar: show,
  };
}
