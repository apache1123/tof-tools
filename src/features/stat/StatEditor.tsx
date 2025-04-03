import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import type { ReactNode } from "react";
import { useState } from "react";
import { useSnapshot } from "valtio";

import type { NumericInputProps } from "../../components/common/NumericInput/NumericInput";
import { NumericInput } from "../../components/common/NumericInput/NumericInput";
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
  /** Initially (when user hasn't edited anything) treat total value as fixed. Whatever the user inputs next, the component will prioritize adjusting the value or augment increase value to maintain the total value. */
  initialFixedTotalValue?: boolean;
}

type InputField = "value" | "augmentIncrease" | "total";

/** The stat editor is made up of a stat type selector and three value input fields - the value, the augment increase and the total value (value + augment increase = total value).
 * It adjusts the three values based on what the user has inputted, by assuming whatever field the user has inputted into should remain "fixed". E.g. If user inputs value, then inputs augment value => adjust total value. On the other hand, if user inputs value, then inputs total value => adjust augment value. */
export const StatEditor = ({
  statProxy,
  possibleStatTypes = [],
  isAugmented,
  isRolled,
  isHighestRolled,
  showTotalValueOnly,
  initialFixedTotalValue,
}: StatEditorProps) => {
  const { type, value, augmentIncreaseValue, totalValue, minValue } =
    useSnapshot(statProxy) as RandomStat;

  const [editedInputs, setEditedInputs] = useState<InputField[]>(
    initialFixedTotalValue ? ["total"] : [],
  );
  /** Returns the last user edited input field, optionally excluding a specific input field */
  function getLastEditedInput(apartFrom?: InputField) {
    return editedInputs.findLast((input) => input !== apartFrom);
  }
  /** Records the last user edited input field. Will not do anything if the input is already the last recorded */
  function recordLastEditedInput(input: InputField) {
    if (editedInputs[editedInputs.length - 1] !== input) {
      setEditedInputs([...editedInputs, input]);
    }
  }

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
            onChangeCommitted={(value) => {
              if (getLastEditedInput("value") === "total") {
                statProxy.setValueTryKeepTotalValue(value);
              } else {
                statProxy.setValue(value);
              }

              recordLastEditedInput("value");
            }}
            min={minValue}
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
            onChangeCommitted={(value) => {
              if (getLastEditedInput("augmentIncrease") === "total") {
                statProxy.setAugmentIncreaseValueTryKeepTotalValue(value);
              } else {
                statProxy.setAugmentIncreaseValue(value);
              }

              recordLastEditedInput("augmentIncrease");
            }}
            min={0}
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
            onChangeCommitted={(value) => {
              if (getLastEditedInput("total") === "augmentIncrease") {
                statProxy.setTotalValueTryKeepAugmentIncreaseValue(value);
              } else {
                statProxy.setTotalValueTryKeepValue(value);
              }

              recordLastEditedInput("total");
            }}
            min={minValue}
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
  ["aria-label"]: ariaLabel,
  ...rest
}: {
  isPercentageBased: boolean;
} & Pick<
  NumericInputProps,
  "value" | "onChangeCommitted" | "min" | "disabled" | "label" | "aria-label"
>) {
  return (
    <NumericInput
      percentageMode={isPercentageBased}
      size="small"
      aria-label={ariaLabel}
      {...rest}
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
  valueInput?: ReactNode;
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
        alignItems="start"
      >
        <Grid xs>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box maxWidth={40} display="flex" alignItems="center">
              {typeIcon}
            </Box>
            {typeSelector}
          </Stack>
        </Grid>
        {valueInput && <Grid xs={inputWidth}>{valueInput}</Grid>}
        {augmentIncreaseValueInput && (
          <Grid xs={inputWidth}>{augmentIncreaseValueInput}</Grid>
        )}
        {totalValueInput && (
          <Grid
            xs={
              valueInput || augmentIncreaseValueInput
                ? inputWidth
                : inputWidth * 2
            }
          >
            {totalValueInput}
          </Grid>
        )}
        <Box sx={{ width: 24, mt: 1.5 }}>{rolledIcon}</Box>
      </Grid>
    </Box>
  );
}
