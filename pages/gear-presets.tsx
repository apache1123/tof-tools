import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { GearSetPresets } from "../src/features/gear-set-presets/GearSetPresets";

export default function GearPresetsPage() {
  useEffect(() => {
    db.init(["characters", "gears", "gearSetPresets"]);
  }, []);

  return (
    <>
      <Head>
        <title>Gear Presets | Tower of Fantasy Tools</title>
      </Head>

      <GearSetPresets />
    </>
  );
}
