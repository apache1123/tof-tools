import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Paper, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { proxy, useSnapshot } from "valtio";

import {
  EmptyStatEditor,
  StatEditor,
} from "../../components/mutational/StatEditor/StatEditor";
import { NumericStringPercentage2dp } from "../../components/presentational/NumericString/NumericString";
import { statTypesLookup } from "../../definitions/stat-types";
import { RandomStat } from "../../models/random-stat";
import type { StatType } from "../../models/stat-type";

const possibleStatTypes = statTypesLookup.allIds.map(
  (id) => statTypesLookup.byId[id],
);

const state = proxy<{ stat: RandomStat | undefined }>({ stat: undefined });

export function StatMaxAugmentIncrease() {
  const { stat: statState } = state;
  const { stat: statSnap } = useSnapshot(state);

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <Typography variant="h5">
          Calculate max augment(titan) increase for stat
        </Typography>
        <Tooltip
          title={
            <Image
              src="/max_augment_increase_example.png"
              alt="max-augment-increase-example"
              width={430}
              height={295}
            />
          }
          slotProps={{ tooltip: { sx: { maxWidth: "fit-content" } } }}
        >
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      </Stack>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          {statSnap && statState ? (
            <StatEditor
              possibleStatTypes={possibleStatTypes}
              statSnap={statSnap as RandomStat}
              statState={statState}
              isAugmented={false}
            />
          ) : (
            <EmptyStatEditor
              possibleStatTypes={possibleStatTypes}
              onStatTypeChange={handleNewStat}
              isAugmented={false}
            />
          )}
        </Grid>
        <Grid xs={12}>
          <Typography>
            Max augment increase value:{" "}
            {statSnap ? (
              statSnap.type.isPercentageBased ? (
                <NumericStringPercentage2dp
                  value={statSnap.getMaxAugmentIncrease()}
                />
              ) : (
                statSnap.getMaxAugmentIncrease()
              )
            ) : (
              0
            )}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  function handleNewStat(statType: StatType) {
    state.stat = new RandomStat(statType);
  }
}
