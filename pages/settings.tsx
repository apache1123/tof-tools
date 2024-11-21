import { Stack } from "@mui/material";
import Head from "next/head";

import { TransferAppData } from "../src/features/settings/TransferAppData";

export default function StatsPage() {
  return (
    <>
      <Head>
        <title>Settings | Tower of Fantasy Tools</title>
      </Head>

      <Stack spacing={6}>
        <TransferAppData />
      </Stack>
    </>
  );
}
