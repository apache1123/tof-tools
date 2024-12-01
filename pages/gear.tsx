import Head from "next/head";

import { Gears } from "../src/features/gears/Gears";

export default function GearPage() {
  return (
    <>
      <Head>
        <title>Gear | Tower of Fantasy Tools</title>
      </Head>

      <Gears />
    </>
  );
}
