import type { Meta, StoryObj } from "@storybook/react";

import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionCardContent } from "./WeaponDefinitionCardContent";

const meta: Meta<typeof WeaponDefinitionCardContent> = {
  title: "Weapon Definition Card Content",
  component: WeaponDefinitionCardContent,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponDefinitionCardContent>;

const definition = weaponDefinitions.byId["King"];
export const Default: Story = {
  args: { ...definition },
};

export const NolaVariation: Story = {
  args: { ...weaponDefinitions.byId["Nola (Volt-Frost)"] },
};
