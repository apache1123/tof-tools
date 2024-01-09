import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { type ChangeEvent, useState } from 'react';

import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import { localStoragePersistenceState } from '../../states/hooks/useLocalStoragePersistence';
import type { StateMigrationsState } from '../../states/migrations/state-migrations-state';
import { stateMigrationsStateKey } from '../../states/migrations/state-migrations-state';

export function TransferAppData() {
  // Disallow users to import until they've made a backup
  const [hasMadeBackup, setHasMadeBackup] = useState(false);

  return (
    <Box>
      <Typography variant="h5" component="h2" mb={1}>
        Export/Import app data
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ExportAppData />
          <ImportAppData />
          {!hasMadeBackup && (
            <Typography variant="subtitle2" color="warning.main">
              Please press <b>Export</b> to save a backup first before doing an{' '}
              <b>Import</b>
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );

  function ExportAppData() {
    function handleExport() {
      const data: Record<string, object> = {};
      localStoragePersistenceState.persistedKeys.forEach((key) => {
        const json = localStorage.getItem(key);
        if (json) {
          data[key] = JSON.parse(json);
        }
      });

      const stateMigrationsJson = localStorage.getItem(stateMigrationsStateKey);
      if (stateMigrationsJson) {
        data[stateMigrationsStateKey] = JSON.parse(stateMigrationsJson);
      }

      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'tof-tools-data.json';
      link.click();
      URL.revokeObjectURL(url);

      setHasMadeBackup(true);
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
            localStorage.clear();

            Object.keys(data).forEach((key) => {
              localStorage.setItem(
                key,
                JSON.stringify((data as Record<string, unknown>)[key])
              );
            });

            // Backup files using the v1, v2, or v3 schema don't include a `state-migrations` key which the stateMigrations mechanism depend on.
            // The stateMigrations mechanism assumes the schema is v1 if that key is not present, then proceeds to perform state migrations, upgrading to the next version until the latest.
            // If the schema is v2 or v3, but the assumed schema is v1, there will be problems.
            // Manually check the schema to see if it is v1 or v2 and set the `state-migrations` key accordingly (from v2 to v3 is only data-fix, so we can safely mark v3 as v2 and let the state migrations mechanism handle the rest)
            type UnknownSchema = {
              [stateMigrationsStateKey]?: StateMigrationsState;
              loadouts?: never;
            };
            const unknownDataSchema = data as UnknownSchema;
            if (!unknownDataSchema[stateMigrationsStateKey]) {
              const stateMigrationsState: StateMigrationsState =
                unknownDataSchema.loadouts ? { version: 2 } : { version: 1 };
              localStorage.setItem(
                stateMigrationsStateKey,
                JSON.stringify(stateMigrationsState)
              );
            }

            showSnackbar('Successfully imported data. Page will reload soon');
            setTimeout(() => {
              location.reload();
            }, 3000);
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
        <Button component="label" variant="outlined" disabled={!hasMadeBackup}>
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
}
