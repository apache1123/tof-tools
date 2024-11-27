import Head from "next/head";

import { Gears } from "../src/features/gears/Gears";

export default function GearsPage() {
  return (
    <>
      <Head>
        <title>Gears | Tower of Fantasy Tools</title>
      </Head>

      <Gears />
    </>
  );
}
