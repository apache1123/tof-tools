import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import type { ReactNode } from "react";
import { useSnapshot } from "valtio";

import type { RandomStat } from "../../../../models/gear/random-stat";
import type { StatType } from "../../../../models/gear/stat-type";
import type { NumericInputProps } from "../../../presentational/common/NumericInput/NumericInput";
import { NumericInput } from "../../../presentational/common/NumericInput/NumericInput";
import { PercentageNumericInput } from "../../../presentational/common/NumericInput/PercentageNumericInput";
import { StatTypeIcon } from "../../../presentational/stat/StatTypeIcon/StatTypeIcon";
import { StatTypeSelector } from "../../../presentational/stat/StatTypeSelector/StatTypeSelector";

export interface StatEditorProps {
  statProxy: RandomStat;
  possibleStatTypes: StatType[];
  isAugmented: boolean;
}

export const StatEditor = ({
  statProxy,
  possibleStatTypes = [],
  isAugmented,
}: StatEditorProps) => {
  const { type, value, augmentIncreaseValue, totalValue } = useSnapshot(
    statProxy,
  ) as RandomStat;

  return (
    <Layout
      typeIcon={
        <StatTypeIcon
          role={type.role}
          element={type.elementalType}
          size={isAugmented ? 20 : 30}
        />
      }
      typeSelector={
        <StatTypeSelector
          selectedStatType={type}
          possibleStatTypes={possibleStatTypes}
          onChange={(statType) => {
            statProxy.type = statType;
          }}
        />
      }
      valueInput={
        <StatInput
          isPercentageBased={type.isPercentageBased}
          value={value}
          onChange={(value) => {
            statProxy.value = value;
          }}
          label={isAugmented ? "Base" : undefined}
          aria-label="stat-value-input"
        />
      }
      augmentIncreaseValueInput={
        isAugmented && (
          <StatInput
            isPercentageBased={type.isPercentageBased}
            value={augmentIncreaseValue}
            onChange={(value) => {
              statProxy.augmentIncreaseValue = value;
            }}
            label={<Typography color="titan.main">Increase</Typography>}
            aria-label="stat-augment-increase-value-input"
          />
        )
      }
      totalValueInput={
        isAugmented && (
          <StatInput
            isPercentageBased={type.isPercentageBased}
            value={totalValue}
            onChange={(value) => {
              statProxy.totalValue = value;
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
      typeIcon={<StatTypeIcon role={undefined} element={undefined} />}
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
