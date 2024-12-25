import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { Weapons } from "../src/features/weapons/Weapons";

export default function WeaponsPage() {
  useEffect(() => {
    db.init(["characters", "matrices", "weapons", "matrixPresets"]);
  }, []);

  return (
    <>
      <Head>
        <title>Weapons | Tower of Fantasy Tools</title>
      </Head>

      <Weapons />
    </>
  );
}
