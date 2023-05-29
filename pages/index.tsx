import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import statsDataService from '../src/data-services/stats-data-service';
import Button from '@mui/material/Button';

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

export const getStaticProps: GetStaticProps = async () => {
  const stats = statsDataService.getAllStatDefinitions();
  return {
    props: {
      stats,
    },
  };
};
