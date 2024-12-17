import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { exampleEyepiece } from "../../../__fixtures__/gear";
import { GearEditorModal } from "./GearEditorModal";

const meta: Meta<typeof GearEditorModal> = {
  component: GearEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearEditorModal>;

const gear = proxy(exampleEyepiece);
export const Default: Story = {
  args: { gearState: gear },
};
