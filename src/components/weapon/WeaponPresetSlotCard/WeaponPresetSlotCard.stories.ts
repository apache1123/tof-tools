import type { Meta, StoryObj } from "@storybook/react";

import { exampleWeaponPreset1 } from "../../__fixtures__/weapon-preset";
import { WeaponPresetSlotCard } from "./WeaponPresetSlotCard";

const meta: Meta<typeof WeaponPresetSlotCard> = {
  component: WeaponPresetSlotCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponPresetSlotCard>;

export const WithoutWeaponPreset: Story = {
  args: { weaponPreset: undefined },
};

export const WithWeaponPreset: Story = {
  args: { weaponPreset: exampleWeaponPreset1 },
};
