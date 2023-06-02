import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { gearTypeService } from '../src/data-services/gear-type-service';
import { GearType } from '../src/types';
import { statTypeService } from '../src/data-services/stat-type-service';

interface GearComparerProps {
  gearTypes: GearType[];
}

export default function GearComparer({ gearTypes }: GearComparerProps) {
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
          {JSON.stringify(gearTypes)}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps<GearComparerProps> = async () => {
  const gearTypes = gearTypeService.getAllGearTypes(statTypeService);

  return {
    props: {
      gearTypes,
    },
  };
};
