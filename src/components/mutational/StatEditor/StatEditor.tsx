import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import type { ReactNode } from "react";
import { useSnapshot } from "valtio";

import type { RandomStat } from "../../../models/random-stat";
import type { StatType } from "../../../models/stat-type";
import type { NumericInputProps } from "../../presentational/NumericInput/NumericInput";
import { NumericInput } from "../../presentational/NumericInput/NumericInput";
import { PercentageNumericInput } from "../../presentational/NumericInput/PercentageNumericInput";
import { StatTypeIcon } from "../../presentational/StatTypeIcon/StatTypeIcon";
import { StatTypeSelector } from "../../presentational/StatTypeSelector/StatTypeSelector";

export interface StatEditorProps {
  statState: RandomStat;
  possibleStatTypes: StatType[];
  isAugmented: boolean;
}

export const StatEditor = ({
  statState,
  possibleStatTypes = [],
  isAugmented,
}: StatEditorProps) => {
  const statSnap = useSnapshot(statState) as RandomStat;
  const statType = statSnap.type;

  return (
    <Layout
      typeIcon={
        <StatTypeIcon statType={statType} size={isAugmented ? 20 : 30} />
      }
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
        <StatInput
          isPercentageBased={statType.isPercentageBased}
          value={statSnap.value}
          onChange={(value) => {
            statState.value = value;
          }}
          label={isAugmented ? "Base" : undefined}
          aria-label="stat-value-input"
        />
      }
      augmentIncreaseValueInput={
        isAugmented && (
          <StatInput
            isPercentageBased={statType.isPercentageBased}
            value={statSnap.augmentIncreaseValue}
            onChange={(value) => {
              statState.augmentIncreaseValue = value;
            }}
            label={<Typography color="titan.main">Increase</Typography>}
            aria-label="stat-augment-increase-value-input"
          />
        )
      }
      totalValueInput={
        isAugmented && (
          <StatInput
            isPercentageBased={statType.isPercentageBased}
            value={statSnap.totalValue}
            onChange={(value) => {
              statState.totalValue = value;
            }}
            label={<Typography color="titan.main">Total</Typography>}
            aria-label="stat-total-value-input"
          />
        )
      }
    />
  );
};

interface EmptyStatEditorProps
  extends Pick<StatEditorProps, "possibleStatTypes" | "isAugmented"> {
  onStatTypeChange(statType: StatType): void;
}

export const EmptyStatEditor = ({
  possibleStatTypes = [],
  isAugmented,
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
      valueInput={
        <NumericInput disabled label={isAugmented ? "Base" : undefined} />
      }
      augmentIncreaseValueInput={
        isAugmented && (
          <NumericInput
            disabled
            label={<Typography color="titan.main">Increase</Typography>}
          />
        )
      }
      totalValueInput={
        isAugmented && (
          <NumericInput
            disabled
            label={<Typography color="titan.main">Total</Typography>}
          />
        )
      }
    />
  );
};

function StatInput({
  isPercentageBased,
  value,
  onChange,
  disabled,
  label,
  ["aria-label"]: ariaLabel,
}: {
  isPercentageBased: boolean;
} & Pick<
  NumericInputProps,
  "value" | "onChange" | "disabled" | "label" | "aria-label"
>) {
  return isPercentageBased ? (
    <PercentageNumericInput
      value={value}
      onChange={onChange}
      disabled={disabled}
      label={label}
      aria-label={ariaLabel}
    />
  ) : (
    <NumericInput
      value={value}
      onChange={onChange}
      disabled={disabled}
      label={label}
      aria-label={ariaLabel}
    />
  );
}

function Layout({
  typeIcon,
  typeSelector,
  valueInput,
  augmentIncreaseValueInput,
  totalValueInput,
}: {
  typeIcon: ReactNode;
  typeSelector: ReactNode;
  valueInput: ReactNode;
  augmentIncreaseValueInput?: ReactNode;
  totalValueInput?: ReactNode;
}) {
  const isTitanLayout = !!augmentIncreaseValueInput || !!totalValueInput;
  const inputWidth = isTitanLayout ? 2 : 3;

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="end"
      >
        <Grid xs>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box maxWidth={40} display="flex" alignItems="center">
              {typeIcon}
            </Box>
            {typeSelector}
          </Stack>
        </Grid>
        <Grid xs={inputWidth}>{valueInput}</Grid>
        {augmentIncreaseValueInput && (
          <Grid xs={inputWidth}>{augmentIncreaseValueInput}</Grid>
        )}
        {totalValueInput && <Grid xs={inputWidth}>{totalValueInput}</Grid>}
      </Grid>
    </Box>
  );
}
