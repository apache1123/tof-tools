import type { AlertColor, SnackbarCloseReason } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";

export enum AutoHideDuration {
  Short = 3000,
  Long = 5000,
}

const defaultSeverity: AlertColor = "success";
const defaultAutoHideDuration = AutoHideDuration.Short;

export function useAutoHideSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ReactNode>(undefined);
  const [severity, setSeverity] = useState(defaultSeverity);
  const [autoHideDuration, setAutoHideDuration] = useState(
    defaultAutoHideDuration,
  );

  function show(
    message: ReactNode,
    options: { severity?: AlertColor; autoHideDuration?: AutoHideDuration } = {
      severity: defaultSeverity,
      autoHideDuration: defaultAutoHideDuration,
    },
  ) {
    setMessage(message);

    const { severity, autoHideDuration } = options;
    if (severity) setSeverity(severity);
    if (autoHideDuration) setAutoHideDuration(autoHideDuration);

    setOpen(true);
  }

  function handleClose(
    event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function SnackbarComponent() {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
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
