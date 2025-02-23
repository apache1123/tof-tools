import type { Meta, StoryObj } from "@storybook/react";

import { exampleWeaponPreset1 } from "../../__fixtures__/weapon-preset";
import { WeaponPresetCard } from "./WeaponPresetCard";

const meta: Meta<typeof WeaponPresetCard> = {
  component: WeaponPresetCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponPresetCard>;

const weaponPreset = exampleWeaponPreset1;

export const Default: Story = {
  args: {
    weaponDefinition: weaponPreset.definition,
    stars: weaponPreset.stars,
    matrixSlots: weaponPreset.matrixSlots.getSlots(),
  },
};
