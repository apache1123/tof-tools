import type { Meta, StoryObj } from "@storybook/react";

import { exampleWeapon } from "../../__fixtures__/weapon";
import { exampleWeaponPreset1 } from "../../__fixtures__/weapon-preset";
import { WeaponPresetCard } from "./WeaponPresetCard";

const meta: Meta<typeof WeaponPresetCard> = {
  component: WeaponPresetCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponPresetCard>;

export const Default: Story = {
  args: {
    weapon: exampleWeapon,
    matrixSlots: exampleWeaponPreset1.matrixSlots.getSlots(),
  },
};
