import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import statsDataService from '../src/data-services/stats-data-service';
import { Stat } from '../src/types';

interface GearComparerProps {
  stats: Stat[];
}

export default function GearComparer({ stats }: GearComparerProps) {
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
            Gear comparer
          </Typography>
          <Link href="/" color="secondary">
            Home
          </Link>
          {stats.map(({ name, range, type, element }) => (
            <div key={name}>
              {name} {range.base} {range.min} {range.max} {type} {element}
            </div>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const stats = statsDataService.getAllStats();
  return {
    props: {
      stats,
    },
  };
};
