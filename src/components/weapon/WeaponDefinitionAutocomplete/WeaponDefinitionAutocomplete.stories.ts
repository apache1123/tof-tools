import type { Meta, StoryObj } from "@storybook/react";

import { getAllWeaponDefinitions } from "../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionAutocomplete } from "./WeaponDefinitionAutocomplete";

const meta: Meta<typeof WeaponDefinitionAutocomplete> = {
  component: WeaponDefinitionAutocomplete,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponDefinitionAutocomplete>;

const options = getAllWeaponDefinitions();

export const Default: Story = { args: { options, value: undefined } };

export const Selected: Story = {
  args: { options, value: options[0] },
};
