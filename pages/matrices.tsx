import Head from "next/head";
import { useEffect } from "react";

import { db } from "../src/db/reactive-local-storage-db";
import { Matrices } from "../src/features/matrices/Matrices";
import { useLocalStoragePersistence } from "../src/states/hooks/useLocalStoragePersistence";
import { matrixState, matrixStateKey } from "../src/states/matrix/matrix-state";

export default function MatricesPage() {
  useEffect(() => {
    db.init(["characters", "matrices"]);
  }, []);

  useLocalStoragePersistence(matrixStateKey, matrixState);

  return (
    <>
      <Head>
        <title>Matrices | Tower of Fantasy Tools</title>
      </Head>

      <Matrices />
    </>
  );
}
