import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';

import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import { localStoragePersistenceState } from '../../states/hooks/useLocalStoragePersistence';

export function TransferAppData() {
  return (
    <Box>
      <Typography variant="h5" component="h2" mb={1}>
        Export/Import app data
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ExportAppData />
          <ImportAppData />
          <Typography variant="subtitle2">
            Sorry, the import feature is temporarily disabled to fix a bug
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

function ExportAppData() {
  function handleExport() {
    const data: Record<string, object> = {};
    localStoragePersistenceState.persistedKeys.forEach((key) => {
      const json = localStorage.getItem(key);
      if (json) {
        data[key] = JSON.parse(json);
      }
    });

    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'tof-tools-data.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="outlined" onClick={handleExport}>
      Export
    </Button>
  );
}

function ImportAppData() {
  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar();

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (!file) return;

    if (file.type !== 'application/json') {
      showSnackbar('Invalid file type', { severity: 'error' });
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        let data: unknown;
        try {
          data = JSON.parse(reader.result as string);
        } catch (error) {
          showSnackbar('Invalid file', { severity: 'error' });
          return;
        }

        if (data && data.constructor == Object) {
          Object.keys(data).forEach((key) => {
            localStorage.setItem(
              key,
              JSON.stringify((data as Record<string, unknown>)[key])
            );
          });

          showSnackbar('Successfully imported data');
        } else {
          showSnackbar('Invalid file', { severity: 'error' });
        }
      } else {
        showSnackbar('Invalid file', { severity: 'error' });
      }
    };

    reader.readAsText(file);
  }

  return (
    <>
      {/* https://mui.com/material-ui/react-button/#file-upload */}
      <Button component="label" variant="outlined" disabled>
        Import
        {/* Visually hidden input */}
        <input
          type="file"
          style={{
            height: 1,
            width: 1,
            visibility: 'hidden',
          }}
          onChange={handleImport}
        />
      </Button>
      <SnackbarComponent />
    </>
  );
}
