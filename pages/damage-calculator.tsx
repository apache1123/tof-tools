import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export default function DamageCalculatorPage() {
  return (
    <>
      <Head>
        <title>Damage Calculator | Tower of Fantasy Tools</title>
      </Head>

      <Box sx={{ p: 2, textAlign: "center", mb: 10 }}>
        <Box mb={10}>
          <Image
            src="/stickers/赦免天使在工作 01.gif"
            alt="Under construction"
            width={240}
            height={240}
          />
        </Box>
        <Typography variant="h4" component="h2" mb={5}>
          Under construction. Coming soon!
        </Typography>
      </Box>
    </>
  );
}
