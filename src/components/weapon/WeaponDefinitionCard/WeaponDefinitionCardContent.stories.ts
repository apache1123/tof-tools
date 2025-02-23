import type { Meta, StoryObj } from "@storybook/react";

import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionCardContent } from "./WeaponDefinitionCardContent";

const meta: Meta<typeof WeaponDefinitionCardContent> = {
  component: WeaponDefinitionCardContent,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponDefinitionCardContent>;

const definition = getWeaponDefinition("King");
export const Default: Story = {
  args: { ...definition },
};

export const NolaVariation: Story = {
  args: { ...getWeaponDefinition("Nola (Volt-Frost)") },
};

export const WithoutDescription: Story = {
  args: { ...definition, showWeaponDescription: false },
};
