import Grid from '@mui/material/Unstable_Grid2';

import { RandomStatType } from '../../models/random-stat-type';
import { Stat } from '../../models/stat';
import { StatType } from '../../models/stat-type';
import { NumericInput } from '../NumericInput/NumericInput';
import { PercentageNumericInput } from '../NumericInput/PercentageNumericInput';
import { StatTypeIcon } from '../StatTypeIcon/StatTypeIcon';
import { StatTypeSelector } from '../StatTypeSelector/StatSelector';

export interface StatEditorProps {
  selectedStat: Stat | undefined;
  possibleStatTypes: StatType[];
  onStatTypeChange: (value: StatType | undefined) => unknown;
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
      <Grid xs display="flex" alignItems="end">
        <StatTypeSelector
          selectedStatType={selectedStat?.type}
          possibleStatTypes={possibleStatTypes}
          onChange={onStatTypeChange}
        />
      </Grid>
      <Grid xs={3} display="flex" alignItems="end">
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

export interface RandomStatEditorProps
  extends Omit<StatEditorProps, 'onStatTypeChange'> {
  possibleStatTypes: RandomStatType[];
  onStatTypeChange(value: RandomStatType): void;
}

export const RandomStatEditor = (props: RandomStatEditorProps) => {
  // TODO: Fix this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <StatEditor {...props} />;
};
