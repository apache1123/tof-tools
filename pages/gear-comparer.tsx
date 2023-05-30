import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { statConfigDataService } from '../src/data-services/stat-config-data-service';
import { gearConfigDataService } from '../src/data-services/gear-config-data-service';
import { GearDefinition } from '../src/types';
import { gearDefinitionService } from '../src/data-services/gear-definition-service';
import { statDefinitionService } from '../src/data-services/stat-definition-service';

interface GearComparerProps {
  gearDefinitions: GearDefinition[];
}

export default function GearComparer({ gearDefinitions }: GearComparerProps) {
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
          {gearDefinitions.map(({ name, availableStatDefinitions }) => (
            <React.Fragment key={name}>
              <div key={name}>{name}</div>
              <div>
                {availableStatDefinitions.map(({ name, range }) => (
                  <span key={name}>
                    {name} {range.base} {range.min} {range.max}
                  </span>
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
  const gearDefinitions = gearDefinitionService.getAllGearDefinitions(
    gearConfigDataService,
    statDefinitionService,
    statConfigDataService
  );
  return {
    props: {
      gearDefinitions,
    },
  };
};
