import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { allExampleGears } from "../../../__fixtures__/gear";
import { exampleGearSetPreset } from "../../../__fixtures__/gear-set-preset";
import { GearSetPresetEditorModal } from "./GearSetPresetEditorModal";

const meta: Meta<typeof GearSetPresetEditorModal> = {
  component: GearSetPresetEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSetPresetEditorModal>;

const presetProxy = proxy(exampleGearSetPreset);
const allGearsProxy = proxy(allExampleGears);

export const Default: Story = {
  args: { presetProxy, allGearsProxy },
};
