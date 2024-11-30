import Head from "next/head";

import { Matrices } from "../src/features/matrices/Matrices";

export default function MatricesPage() {
  return (
    <>
      <Head>
        <title>Matrices | Tower of Fantasy Tools</title>
      </Head>

      <Matrices />
    </>
  );
}
