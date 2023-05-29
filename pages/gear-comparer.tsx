import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import statsDataService from '../src/data-services/stats-data-service';
import { GearDefinition, StatDefinition } from '../src/types';
import { gearDataService } from '../src/data-services/gear-data-service';

interface GearComparerProps {
  statDefinitions: StatDefinition[];
  gearDefinitions: GearDefinition[];
}

export default function GearComparer({
  statDefinitions,
  gearDefinitions,
}: GearComparerProps) {
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
          {statDefinitions.map(({ name, range, type, element }) => (
            <div key={name}>
              {name} {range.base} {range.min} {range.max} {type} {element}
            </div>
          ))}
          <br />
          {gearDefinitions.map(({ name, availableStats }) => (
            <React.Fragment key={name}>
              <div key={name}>{name}</div>
              <div>
                {availableStats.map((stat) => (
                  <span key={stat}>{stat} </span>
                ))}
              </div>
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps<GearComparerProps> = async () => {
  const statDefinitions = statsDataService.getAllStatDefinitions();
  const gearDefinitions = gearDataService.getAllGearDefinitions();
  return {
    props: {
      statDefinitions,
      gearDefinitions,
    },
  };
};
