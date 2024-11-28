import Head from "next/head";

import { Weapons } from "../src/features/weapons/Weapons";

export default function WeaponsPage() {
  return (
    <>
      <Head>
        <title>Weapons | Tower of Fantasy Tools</title>
      </Head>

      <Weapons />
    </>
  );
}
