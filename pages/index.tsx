import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import * as React from 'react';

import Link from '../src/components/Link';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>ToF tools</title>
      </Head>

      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            ToF tools
          </Typography>
          <Button
            variant="contained"
            component={Link}
            noLinkStyle
            href="/gear-comparer"
          >
            Gear comparer
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
