import type { Meta, StoryObj } from "@storybook/react";

import { getAllWeaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionList } from "./WeaponDefinitionList";

const meta: Meta<typeof WeaponDefinitionList> = {
  component: WeaponDefinitionList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponDefinitionList>;

export const Default: Story = {
  args: { weaponDefinitions: getAllWeaponDefinitions() },
};
