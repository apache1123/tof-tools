import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stat } from '../../types';
import { StatIcon } from '../StatIcon/StatIcon';
import { NumericInput } from '../NumericInput/NumericInput';
import { PercentageNumericInput } from '../NumericInput/PercentageNumericInput';
import { StatSelector } from '../StatSelector/StatSelector';

export interface StatLineProps {
  stat: Stat;
  editable?: StatLineEditableProps;
}

export interface StatLineEditableProps {
  enabled: boolean;
  availableStats: Stat[];
  onStatChange: (value: Stat) => unknown;
  onValueChange: (value: number) => unknown;
}

export const StatLine = ({
  stat,
  editable = {
    enabled: false,
    availableStats: [],
    onStatChange: null,
    onValueChange: null,
  },
}: StatLineProps) => {
  const { value, definition } = stat;
  const { name, type, element, isPercentageBased } = definition;
  return (
    <Grid container spacing={2}>
      <Grid xs="auto" display="flex" alignItems="center">
        <StatIcon statType={type} element={element} />
      </Grid>
      <Grid xs={3} display="flex" alignItems="center">
        {editable.enabled ? (
          <div style={{ width: '100%' }}>
            <StatSelector
              stats={editable.availableStats}
              onChange={editable.onStatChange}
            />
          </div>
        ) : (
          <span>{name}</span>
        )}
      </Grid>
      <Grid xs display="flex" alignItems="center">
        {editable.enabled ? (
          isPercentageBased ? (
            <PercentageNumericInput
              {...{ value, onChange: editable.onValueChange }}
            />
          ) : (
            <NumericInput {...{ value, onChange: editable.onValueChange }} />
          )
        ) : (
          <span>{value}</span>
        )}
      </Grid>
    </Grid>
  );
};
