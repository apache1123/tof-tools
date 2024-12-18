import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { exampleEyepiece, exampleGloves } from "../../../__fixtures__/gear";
import { GearEditor } from "./GearEditor";

const meta: Meta<typeof GearEditor> = {
  component: GearEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearEditor>;

const gearProxy = proxy(exampleEyepiece);
export const Default: Story = {
  args: { gearProxy },
};

const titanGearProxy = proxy(exampleGloves);
titanGearProxy.isAugmented = true;
export const Titan: Story = {
  args: { gearProxy: titanGearProxy },
};
