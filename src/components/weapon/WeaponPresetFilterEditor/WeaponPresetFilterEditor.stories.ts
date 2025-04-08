import type { Meta, StoryObj } from "@storybook/react";

import { WeaponPresetFilterEditor } from "./WeaponPresetFilterEditor";

const meta: Meta<typeof WeaponPresetFilterEditor> = {
  component: WeaponPresetFilterEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponPresetFilterEditor>;

export const Default: Story = {
  args: { filter: { definitionId: "Alyss" } },
};
