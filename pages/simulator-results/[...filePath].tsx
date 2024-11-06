import { Container } from "@mui/material";
import { readdir, readFile } from "fs/promises";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import path from "path";
import type { ParsedUrlQuery } from "querystring";

import { CombatSimulatorResult } from "../../src/features/combat-simulator/CombatSimulatorResult";
import type { CombatSimulatorSnapshot } from "../../src/models/v4/combat-simulator/combat-simulator-snapshot";
import { splitFilePath } from "../../src/utils/file-utils";

const simulatorResultsDirPath = "simulator-results/";
const simulatorResultsFileExt = ".json";

interface Params extends ParsedUrlQuery {
  filePath: string[];
}

export const getStaticPaths = (async () => {
  // Results can be in sub directories - return all of them including their sub directory paths
  // e.g. rei/rei0.json
  const fullFilePaths = (
    await readdir(simulatorResultsDirPath, {
      recursive: true,
      withFileTypes: true,
    })
  )
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dirent.path, dirent.name));

  // File path as a string array
  const filePaths = fullFilePaths.map(
    // Remove base dir, remove file extension and split into parts
    (fullFilePath) => {
      const relativePath = fullFilePath.split(simulatorResultsDirPath)[1];
      const filePath = splitFilePath(relativePath);
      filePath[filePath.length - 1] = path.basename(
        filePath[filePath.length - 1],
        path.extname(filePath[filePath.length - 1]),
      );
      return filePath;
    },
  );

  return {
    paths: filePaths.map((pathArray) => ({
      params: { filePath: pathArray },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<Params>;

export const getStaticProps = (async ({ params }) => {
  if (!params) throw new Error();

  const data = await readFile(
    `${path.join(
      simulatorResultsDirPath,
      ...params.filePath,
    )}${simulatorResultsFileExt}`,
    { encoding: "utf-8" },
  );
  const snapshot = JSON.parse(data);
  return { props: { snapshot } };
}) satisfies GetStaticProps<
  {
    snapshot: CombatSimulatorSnapshot;
  },
  Params
>;

export default function SimulatorResult({
  snapshot,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Damage Calculator | Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <CombatSimulatorResult snapshot={snapshot} />
      </Container>
    </>
  );
}
