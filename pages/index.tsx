import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ToF tools</title>
      </Head>

      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Button
          onClick={() => {
            throw new Error('test');
          }}
        >
          Test error
        </Button>
      </Container>
    </>
  );
}
