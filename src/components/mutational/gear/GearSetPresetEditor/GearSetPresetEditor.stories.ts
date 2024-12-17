import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { allExampleGears } from "../../../__fixtures__/gear";
import { exampleGearSetPreset } from "../../../__fixtures__/gear-set-preset";
import { GearSetPresetEditor } from "./GearSetPresetEditor";

const meta: Meta<typeof GearSetPresetEditor> = {
  component: GearSetPresetEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSetPresetEditor>;

const presetProxy = proxy(exampleGearSetPreset);
const allGearsProxy = proxy(allExampleGears);

export const Default: Story = {
  args: { presetProxy, allGearsProxy },
};
