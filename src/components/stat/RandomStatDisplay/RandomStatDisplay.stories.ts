import type { Meta, StoryObj } from "@storybook/react";

import { statTypesLookup } from "../../../definitions/stat-types";
import { RandomStat } from "../../../models/gear/random-stat";
import { RandomStatDisplay } from "./RandomStatDisplay";

const meta: Meta<typeof RandomStatDisplay> = {
  component: RandomStatDisplay,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof RandomStatDisplay>;

const randomStat = new RandomStat(statTypesLookup.byId["Frost Attack"]);
randomStat.setTotalValueTryKeepValue(2000);
export const Default: Story = {
  args: {
    randomStat,
  },
};

const percentageRandomStat = new RandomStat(
  statTypesLookup.byId["Frost Attack %"],
);
randomStat.setTotalValueTryKeepValue(0.03);
export const Percentage: Story = {
  args: {
    randomStat: percentageRandomStat,
  },
};
