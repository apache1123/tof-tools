import Grid from '@mui/material/Unstable_Grid2';
import type { ReactNode } from 'react';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../components/NumericInput/NumericInput';
import { PercentageNumericInput } from '../components/NumericInput/PercentageNumericInput';
import { StatTypeIcon } from '../components/StatTypeIcon/StatTypeIcon';
import { StatTypeSelector } from '../components/StatTypeSelector/StatTypeSelector';
import type { RandomStat } from '../models/random-stat';
import type { StatType } from '../models/stat-type';

export interface StatEditorProps {
  statState: RandomStat;
  possibleStatTypes: StatType[];
}

export const StatEditor = ({
  statState,
  possibleStatTypes = [],
}: StatEditorProps) => {
  const statSnap = useSnapshot(statState);
  const statType = statSnap.type;

  const handleStatValueChange = (value: number) => {
    statState.value = value;
  };

  return (
    <Layout
      typeIcon={<StatTypeIcon statType={statType} />}
      typeSelector={
        <StatTypeSelector
          selectedStatType={statType}
          possibleStatTypes={possibleStatTypes}
          onChange={(statType) => {
            statState.type = statType;
          }}
        />
      }
      valueInput={
        statType.isPercentageBased ? (
          <PercentageNumericInput
            value={statSnap.value}
            onChange={handleStatValueChange}
            aria-label="stat-value-input"
          />
        ) : (
          <NumericInput
            value={statSnap.value}
            onChange={handleStatValueChange}
            aria-label="stat-value-input"
          />
        )
      }
    />
  );
};

interface EmptyStatEditorProps {
  possibleStatTypes: StatType[];
  onStatTypeChange(statType: StatType): void;
}

export const EmptyStatEditor = ({
  possibleStatTypes = [],
  onStatTypeChange,
}: EmptyStatEditorProps) => {
  return (
    <Layout
      typeIcon={<StatTypeIcon statType={undefined} />}
      typeSelector={
        <StatTypeSelector
          selectedStatType={undefined}
          possibleStatTypes={possibleStatTypes}
          onChange={onStatTypeChange}
        />
      }
      valueInput={<NumericInput disabled />}
    />
  );
};

export const DisabledStatEditor = () => {
  return (
    <Layout
      typeIcon={<StatTypeIcon statType={undefined} />}
      typeSelector={<StatTypeSelector possibleStatTypes={[]} disabled />}
      valueInput={<NumericInput disabled />}
    />
  );
};

function Layout({
  typeIcon,
  typeSelector,
  valueInput,
}: {
  typeIcon: ReactNode;
  typeSelector: ReactNode;
  valueInput: ReactNode;
}) {
  return (
    <Grid container spacing={2}>
      <Grid maxWidth={40} display="flex" alignItems="center">
        {typeIcon}
      </Grid>
      <Grid xs display="flex" alignItems="end">
        {typeSelector}
      </Grid>
      <Grid xs={3} display="flex" alignItems="end">
        {valueInput}
      </Grid>
    </Grid>
  );
}
