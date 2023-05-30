import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stat } from '../../types';
import { StatIcon } from '../StatIcon/StatIcon';
import { NumericInput } from '../NumericInput/NumericInput';
import { PercentageNumericInput } from '../NumericInput/PercentageNumericInput';
import { StatSelector } from '../StatSelector/StatSelector';

export interface StatEditorProps {
  selectedStat: Stat;
  availableStats: Stat[];
  onStatChange: (value: Stat) => unknown;
  onValueChange: (value: number) => unknown;
}

export const StatEditor = ({
  selectedStat,
  availableStats = [],
  onStatChange,
  onValueChange,
}: StatEditorProps) => {
  return (
    <Grid container spacing={2}>
      <Grid xs="auto" display="flex" alignItems="center">
        <StatIcon statDefinition={selectedStat?.definition} />
      </Grid>

      <Grid xs={3} display="flex" alignItems="center">
        <div style={{ width: '100%' }}>
          <StatSelector
            value={selectedStat}
            stats={availableStats}
            onChange={onStatChange}
          />
        </div>
      </Grid>

      <Grid xs display="flex" alignItems="center">
        {selectedStat?.definition ? (
          selectedStat.definition.isPercentageBased ? (
            <PercentageNumericInput
              value={selectedStat.value}
              onChange={onValueChange}
            />
          ) : (
            <NumericInput value={selectedStat.value} onChange={onValueChange} />
          )
        ) : (
          <NumericInput disabled />
        )}
      </Grid>
    </Grid>
  );
};
