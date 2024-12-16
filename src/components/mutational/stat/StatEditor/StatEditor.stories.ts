import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { statTypesLookup } from "../../../../definitions/stat-types";
import { RandomStat } from "../../../../models/gear/random-stat";
import { StatEditor } from "./StatEditor";

const meta: Meta<typeof StatEditor> = {
  component: StatEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof StatEditor>;

const statState = proxy(
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
export const Default: Story = {
  args: {
    statState,
    possibleStatTypes: statTypesLookup.allIds.map(
      (statTypeId) => statTypesLookup.byId[statTypeId],
    ),
  },
};
