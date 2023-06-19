import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>ToF tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Grid container>
          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image src="/coco.png" alt="coco" width={160} height={160} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
