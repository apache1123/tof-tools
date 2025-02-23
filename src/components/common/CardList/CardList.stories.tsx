import { Card } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { CardList } from "./CardList";

const meta: Meta<typeof CardList> = {
  component: CardList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CardList>;

export const Default: Story = {
  args: { children: Cards({}) },
};

export const SmallerGap: Story = {
  args: { gap: 1, children: Cards({}) },
};

export const Column: Story = {
  args: { direction: "column", children: Cards({ width: 300, height: 50 }) },
};

function Cards({
  width = 200,
  height = 300,
}: {
  width?: number;
  height?: number;
}) {
  return [...Array(8)].map((i) => <Card key={i} sx={{ width, height }} />);
}
