import type { Meta, StoryObj } from "@storybook/react";

import { exampleWeapon } from "../../__fixtures__/weapon";
import { WeaponCardContent } from "./WeaponCardContent";

const meta: Meta<typeof WeaponCardContent> = {
  component: WeaponCardContent,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponCardContent>;

const weapon = exampleWeapon;
const matrixSlots = weapon.matrixSlots.getSlots();

export const Default: Story = {
  args: { definition: weapon.definition, stars: weapon.stars },
};

export const WithMatrixSlots: Story = {
  args: { definition: weapon.definition, stars: weapon.stars, matrixSlots },
};

export const WithoutWeaponDescription: Story = {
  args: {
    definition: weapon.definition,
    stars: weapon.stars,
    matrixSlots,
    showWeaponDescription: false,
  },
};
