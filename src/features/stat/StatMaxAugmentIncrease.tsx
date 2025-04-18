import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Paper, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { proxy, useSnapshot } from "valtio";

import { NumericString } from "../../components/common/NumericString/NumericString";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import { statTypesLookup } from "../../definitions/stat-types";
import { RandomStat } from "../../models/gear/random-stat";
import type { StatType } from "../../models/gear/stat-type";
import { EmptyStatEditor, StatEditor } from "./StatEditor";

const possibleStatTypes = statTypesLookup.allIds.map(
  (id) => statTypesLookup.byId[id],
);

const state = proxy<{ stat: RandomStat | undefined }>({ stat: undefined });

export function StatMaxAugmentIncrease() {
  const { stat: statProxy } = state;
  const { stat: statSnap } = useSnapshot(state);

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <SectionHeading>
          Calculate max augment(titan) increase for stat
        </SectionHeading>
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
          {statSnap && statProxy ? (
            <StatEditor
              possibleStatTypes={possibleStatTypes}
              statProxy={statProxy}
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
          <Typography gutterBottom>
            Max augmentation increase value:{" "}
            {statSnap ? (
              statSnap.type.isPercentageBased ? (
                <NumericString
                  value={statSnap.getMaxAugmentIncrease()}
                  variant="percentage2dp"
                />
              ) : (
                <NumericString
                  value={statSnap.getMaxAugmentIncrease()}
                  variant="integer"
                />
              )
            ) : (
              0
            )}
          </Typography>
          <Typography gutterBottom>
            Total value after max increase:{" "}
            {statSnap ? (
              statSnap.type.isPercentageBased ? (
                <>
                  <NumericString
                    value={statSnap.baseValue}
                    variant="percentage2dp"
                  />{" "}
                  +{" "}
                  <NumericString
                    value={statSnap.getMaxAugmentIncrease()}
                    variant="percentage2dp"
                  />{" "}
                  ={" "}
                  <NumericString
                    value={statSnap.getMaxAugmentTotalValue()}
                    variant="percentage2dp"
                  />
                </>
              ) : (
                <>
                  <NumericString value={statSnap.baseValue} variant="integer" />{" "}
                  +{" "}
                  <NumericString
                    value={statSnap.getMaxAugmentIncrease()}
                    variant="integer"
                  />{" "}
                  ={" "}
                  <NumericString
                    value={statSnap.getMaxAugmentTotalValue()}
                    variant="integer"
                  />
                </>
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
