import { Stack } from "@mui/material";
import Head from "next/head";

import { CritFlatToPercent } from "../src/features/stat/CritFlatToPercent";
import { StatMaxAugmentIncrease } from "../src/features/stat/StatMaxAugmentIncrease";
import { StatRanges } from "../src/features/stat/StatRanges";

export default function StatsPage() {
  return (
    <>
      <Head>
        <title>Stats Stuff | Tower of Fantasy Tools</title>
      </Head>

      <Stack spacing={4}>
        <StatMaxAugmentIncrease />
        <CritFlatToPercent />
        <StatRanges />
      </Stack>
    </>
  );
}
