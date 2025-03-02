import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab } from "@mui/material";
import { useState } from "react";

import { BuffSummary } from "../../components/combat-simulator/BuffSummary/BuffSummary";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import type { BuffSummary as BuffSummaryModel } from "../../models/buff-summary/buff-summary";

export interface BuffSummariesProps {
  items: { label: string; buffSummary: BuffSummaryModel }[];
}

export function BuffSummaries({ items }: BuffSummariesProps) {
  const [tabValue, setTabValue] = useState(items[0]?.label ?? "");

  if (!items.length) return null;

  return (
    <Paper sx={{ p: 3 }}>
      <SectionHeading>Buffs included in calculations</SectionHeading>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(_, value) => {
              setTabValue(value);
            }}
            aria-label="Buff summaries"
          >
            {items.map((item) => (
              <Tab key={item.label} label={item.label} value={item.label} />
            ))}
          </TabList>
        </Box>

        {items.map((item) => (
          <TabPanel key={item.label} value={item.label}>
            <BuffSummary buffSummary={item.buffSummary} />
          </TabPanel>
        ))}
      </TabContext>
    </Paper>
  );
}
