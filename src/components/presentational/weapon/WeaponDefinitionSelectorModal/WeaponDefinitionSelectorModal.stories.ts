import type { Meta, StoryObj } from "@storybook/react";

import { getAllWeaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionSelectorModal } from "./WeaponDefinitionSelectorModal";

const meta: Meta<typeof WeaponDefinitionSelectorModal> = {
  component: WeaponDefinitionSelectorModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponDefinitionSelectorModal>;

export const Default: Story = {
  args: { weaponDefinitions: getAllWeaponDefinitions() },
};
