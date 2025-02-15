import type { Meta, StoryObj } from "@storybook/react";

import { exampleCharacterId } from "../../__fixtures__/character";
import { exampleAllWeaponPresets } from "../../__fixtures__/weapon-preset";
import { WeaponPresetSelector } from "./WeaponPresetSelector";

const meta: Meta<typeof WeaponPresetSelector> = {
  component: WeaponPresetSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponPresetSelector>;

export const Default: Story = {
  args: {
    characterId: exampleCharacterId,
    weaponPresets: exampleAllWeaponPresets,
  },
};
