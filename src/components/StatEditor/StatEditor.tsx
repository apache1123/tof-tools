import Grid from '@mui/material/Unstable_Grid2';
import { StatTypeIcon } from '../StatTypeIcon/StatTypeIcon';
import { NumericInput } from '../NumericInput/NumericInput';
import { PercentageNumericInput } from '../NumericInput/PercentageNumericInput';
import { StatTypeSelector } from '../StatTypeSelector/StatSelector';
import { RandomStatType } from '../../models/random-stat-type';
import { Stat } from '../../models/stat';
import { StatType } from '../../models/stat-type';

export interface StatEditorProps {
  selectedStat: Stat;
  possibleStatTypes: StatType[];
  onStatTypeChange: (value: StatType) => unknown;
  onStatValueChange: (value: number) => unknown;
}

export const StatEditor = ({
  selectedStat,
  possibleStatTypes = [],
  onStatTypeChange,
  onStatValueChange,
}: StatEditorProps) => {
  return (
    <Grid container spacing={2}>
      <Grid maxWidth={40} display="flex" alignItems="center">
        <StatTypeIcon statType={selectedStat?.type} />
      </Grid>

      <Grid xs display="flex" alignItems="center">
        <StatTypeSelector
          selectedStatType={selectedStat?.type}
          possibleStatTypes={possibleStatTypes}
          onChange={onStatTypeChange}
        />
      </Grid>

      <Grid xs={3} display="flex" alignItems="center">
        {selectedStat?.type ? (
          selectedStat.type.isPercentageBased ? (
            <PercentageNumericInput
              value={selectedStat.value}
              onChange={onStatValueChange}
            />
          ) : (
            <NumericInput
              value={selectedStat.value}
              onChange={onStatValueChange}
            />
          )
        ) : (
          <NumericInput disabled />
        )}
      </Grid>
    </Grid>
  );
};

export interface RandomStatEditorProps extends StatEditorProps {
  possibleStatTypes: RandomStatType[];
  onStatTypeChange(value: RandomStatType);
}

export const RandomStatEditor = (props: RandomStatEditorProps) => {
  return <StatEditor {...props} />;
};
