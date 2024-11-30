import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { gearTypesLookup } from "../../../../definitions/gear-types";
import { statTypesLookup } from "../../../../definitions/stat-types";
import { Gear } from "../../../../models/gear/gear";
import { RandomStat } from "../../../../models/gear/random-stat";
import { GearEditorModal } from "./GearEditorModal";

const meta: Meta<typeof GearEditorModal> = {
  title: "Gear Editor Modal",
  component: GearEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearEditorModal>;

const gear = proxy(new Gear(gearTypesLookup.byId["Eyepiece"], "characterId"));
gear.stars = 3;
gear.setRandomStat(
  0,
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
export const Default: Story = {
  args: { gearState: gear },
};
