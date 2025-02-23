import { Card, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import type { BuffSummary as BuffSummaryModel } from "../../../models/buff-summary/buff-summary";
import type { BuffSummaryItemGroup } from "../../../models/buff-summary/buff-summary-item-group";
import { SectionHeading } from "../../common/SectionHeading/SectionHeading";
import { BuffGroup } from "./BuffGroup";
import { BuffLine } from "./BuffLine";

export interface BuffSummaryProps {
  buffSummary: BuffSummaryModel;
}

export function BuffSummary({ buffSummary }: BuffSummaryProps) {
  const groups: ({
    title: string;
    isPercentageValue: boolean;
  } & BuffSummaryItemGroup)[] = [
    {
      title: "Base attack",
      isPercentageValue: false,
      ...buffSummary.baseAttackBuffs,
    },
    {
      title: "Attack %",
      isPercentageValue: true,
      ...buffSummary.attackPercentBuffs,
    },
    {
      title: "Elemental damage %",
      isPercentageValue: true,
      ...buffSummary.elementalDamageBuffs,
    },
    {
      title: "Final damage %",
      isPercentageValue: true,
      ...buffSummary.finalDamageBuffs,
    },
    {
      title: "Crit rate %",
      isPercentageValue: true,
      ...buffSummary.critRateBuffs,
    },
    {
      title: "Crit damage %",
      isPercentageValue: true,
      ...buffSummary.critDamageBuffs,
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <SectionHeading>Buffs included in calculations</SectionHeading>

      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid key={group.title} xs={12} sm={6} lg={4}>
            <Card elevation={1} sx={{ px: 2, py: 2 }}>
              <BuffGroup
                title={group.title}
                element={buffSummary.element}
                totalValue={group.totalValue}
                isPercentageValue={group.isPercentageValue}
              >
                {group.items.map((item) => (
                  <BuffLine
                    key={item.id}
                    displayName={item.displayName}
                    element={buffSummary.element}
                    totalValue={item.totalValue}
                    isPercentageValue={group.isPercentageValue}
                  />
                ))}
              </BuffGroup>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
