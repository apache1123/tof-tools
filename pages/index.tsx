import Container from '@mui/material/Container';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tower of Fantasy Tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}></Container>
    </>
  );
}
