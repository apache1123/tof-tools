import type { Meta, StoryObj } from "@storybook/react";

import { getAllWeaponDefinitions } from "../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionSelector } from "./WeaponDefinitionSelector";

const meta: Meta<typeof WeaponDefinitionSelector> = {
  component: WeaponDefinitionSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponDefinitionSelector>;

export const Default: Story = {
  args: { weaponDefinitions: getAllWeaponDefinitions() },
};
