import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import type { ReactNode } from "react";
import { useSnapshot } from "valtio";

import type { NumericInputProps } from "../../components/common/NumericInput/NumericInput";
import { NumericInput } from "../../components/common/NumericInput/NumericInput";
import { PercentageNumericInput } from "../../components/common/NumericInput/PercentageNumericInput";
import { StatTypeIcon } from "../../components/stat/StatTypeIcon/StatTypeIcon";
import { StatTypeSelector } from "../../components/stat/StatTypeSelector/StatTypeSelector";
import type { AugmentStat } from "../../models/gear/augment-stat";
import type { RandomStat } from "../../models/gear/random-stat";
import type { StatType } from "../../models/gear/stat-type";

export interface StatEditorProps {
  statProxy: RandomStat | AugmentStat;
  possibleStatTypes: StatType[];
  isAugmented: boolean;
  isRolled?: boolean;
  isHighestRolled?: boolean;
  showTotalValueOnly?: boolean;
}

export const StatEditor = ({
  statProxy,
  possibleStatTypes = [],
  isAugmented,
  isRolled,
  isHighestRolled,
  showTotalValueOnly,
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
        !showTotalValueOnly && (
          <StatInput
            isPercentageBased={type.isPercentageBased}
            value={value}
            onChange={(value) => {
              statProxy.value = value;
            }}
            label={isAugmented ? "Base" : undefined}
            aria-label="stat-value-input"
          />
        )
      }
      augmentIncreaseValueInput={
        isAugmented &&
        !showTotalValueOnly && (
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
      rolledIcon={
        isHighestRolled ? (
          <Tooltip title="The highest rolled into stat (see roll breakdown). This stat will be used to determine the augmentation stats">
            <KeyboardDoubleArrowUpIcon />
          </Tooltip>
        ) : isRolled ? (
          <Tooltip title="Stat that has been rolled into, but is not the highest (see roll breakdown)">
            <KeyboardArrowUpIcon />
          </Tooltip>
        ) : undefined
      }
    />
  );
};

interface EmptyStatEditorProps
  extends Pick<
    StatEditorProps,
    "possibleStatTypes" | "isAugmented" | "showTotalValueOnly"
  > {
  onStatTypeChange(statType: StatType): void;
}

export const EmptyStatEditor = ({
  possibleStatTypes = [],
  isAugmented,
  showTotalValueOnly,
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
        !showTotalValueOnly && (
          <StatInput
            isPercentageBased={false}
            disabled
            label={isAugmented ? "Base" : undefined}
          />
        )
      }
      augmentIncreaseValueInput={
        isAugmented &&
        !showTotalValueOnly && (
          <StatInput
            isPercentageBased={false}
            disabled
            label={<Typography color="titan.main">Increase</Typography>}
          />
        )
      }
      totalValueInput={
        isAugmented && (
          <StatInput
            isPercentageBased={false}
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
      size="small"
      aria-label={ariaLabel}
    />
  ) : (
    <NumericInput
      value={value}
      onChange={onChange}
      disabled={disabled}
      label={label}
      size="small"
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
  rolledIcon,
}: {
  typeIcon: ReactNode;
  typeSelector: ReactNode;
  valueInput: ReactNode;
  augmentIncreaseValueInput?: ReactNode;
  totalValueInput?: ReactNode;
  rolledIcon?: ReactNode;
}) {
  const isTitanLayout = !!augmentIncreaseValueInput || !!totalValueInput;
  const inputWidth = isTitanLayout ? 2 : 3;

  return (
    <Box>
      <Grid
        container
        spacing={1}
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
        <Box sx={{ width: 24, alignSelf: "center" }}>{rolledIcon}</Box>
      </Grid>
    </Box>
  );
}
