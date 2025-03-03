import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab } from "@mui/material";
import { useState } from "react";

import { DamageBreakdown } from "../../components/combat-simulator/DamageBreakdown/DamageBreakdown";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import type { DamageBreakdown as DamageBreakdownModel } from "../../models/damage-breakdown/damage-breakdown";

export interface DamageBreakdownsProps {
  items: {
    label: string;
    damageBreakdown: DamageBreakdownModel;
    finalDamage: number;
  }[];
}

export function DamageBreakdowns({ items }: DamageBreakdownsProps) {
  const [tabValue, setTabValue] = useState(items[0]?.label ?? "");

  if (!items.length) return null;

  return (
    <Paper sx={{ p: 3 }}>
      <SectionHeading>Damage breakdown</SectionHeading>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            onChange={(_, value) => {
              setTabValue(value);
            }}
            aria-label="Damage breakdowns"
          >
            {items.map((item) => (
              <Tab key={item.label} label={item.label} value={item.label} />
            ))}
          </TabList>
        </Box>

        {items.map((item) => {
          const { damageBreakdown } = item;
          return (
            <TabPanel key={item.label} value={item.label}>
              <DamageBreakdown
                element={damageBreakdown.element}
                attack={damageBreakdown.attack}
                buffSummary={damageBreakdown.buffSummary}
                finalDamage={item.finalDamage}
              />
            </TabPanel>
          );
        })}
      </TabContext>
    </Paper>
  );
}
