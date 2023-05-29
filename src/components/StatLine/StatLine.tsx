import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stat } from '../../types';
import { StatIcon } from '../StatIcon/StatIcon';
import { NumericInput } from '../NumericInput/NumericInput';
import { PercentageNumericInput } from '../NumericInput/PercentageNumericInput';

interface StatLineProps {
  stat: Stat;
  editable?: boolean;
  onChange?: (value: number) => unknown;
}

export const StatLine = ({
  stat,
  editable = false,
  onChange,
}: StatLineProps) => {
  const { value, definition } = stat;
  const { name, type, element, isPercentageBased } = definition;
  return (
    <Grid container>
      <Grid xs="auto">
        <StatIcon statType={type} element={element} />
      </Grid>
      <Grid xs={2}>
        <span>{name}</span>
      </Grid>
      <Grid xs>
        {editable ? (
          isPercentageBased ? (
            <PercentageNumericInput {...{ value, onChange }} />
          ) : (
            <NumericInput {...{ value, onChange }} />
          )
        ) : (
          <span>{value}</span>
        )}
      </Grid>
    </Grid>
  );
};
