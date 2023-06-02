import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { StatTypeIcon } from '../StatTypeIcon/StatTypeIcon';
import { NumericInput } from '../NumericInput/NumericInput';
import { PercentageNumericInput } from '../NumericInput/PercentageNumericInput';
import { StatTypeSelector } from '../StatTypeSelector/StatSelector';
import { Stat, StatType } from '../../types';

export interface StatEditorProps {
  selectedStat: Stat;
  possibleStatTypes: StatType[];
  onStatTypeChange: (value: StatType) => unknown;
  onValueChange: (value: number) => unknown;
}

export const StatEditor = ({
  selectedStat,
  possibleStatTypes = [],
  onStatTypeChange,
  onValueChange,
}: StatEditorProps) => {
  return (
    <Grid container spacing={2}>
      <Grid xs="auto" display="flex" alignItems="center">
        <StatTypeIcon statType={selectedStat?.type} />
      </Grid>

      <Grid xs={3} display="flex" alignItems="center">
        <div style={{ width: '100%' }}>
          <StatTypeSelector
            selectedStatType={selectedStat?.type}
            possibleStatTypes={possibleStatTypes}
            onChange={onStatTypeChange}
          />
        </div>
      </Grid>

      <Grid xs display="flex" alignItems="center">
        {selectedStat?.type ? (
          selectedStat.type.isPercentageBased ? (
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
