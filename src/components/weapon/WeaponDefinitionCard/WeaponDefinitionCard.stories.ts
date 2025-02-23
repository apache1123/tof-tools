import type { Meta, StoryObj } from "@storybook/react";

import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionCard } from "./WeaponDefinitionCard";

const meta: Meta<typeof WeaponDefinitionCard> = {
  component: WeaponDefinitionCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponDefinitionCard>;

const definition = getWeaponDefinition("King");
export const Default: Story = {
  args: { ...definition },
};

export const CustomWidth: Story = {
  args: { ...definition, sx: { width: 300 } },
};
