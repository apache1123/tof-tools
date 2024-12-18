import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { Gears } from "../src/features/gears/Gears";
import { gearState, gearStateKey } from "../src/states/gear/gear-state";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";

export default function GearPage() {
  useEffect(() => {
    db.init(["characters", "gears", "gearSetPresets"]);
  }, []);

  useLocalStoragePersistence(gearStateKey, gearState);

  return (
    <>
      <Head>
        <title>Gear | Tower of Fantasy Tools</title>
      </Head>

      <Gears />
    </>
  );
}
