import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Character } from "../../../../models/character/character";
import { Matrix } from "../../../../models/matrix/matrix";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponCard } from "./WeaponCard";

const meta: Meta<typeof WeaponCard> = {
  title: "Weapon Card",
  component: WeaponCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponCard>;

const weapon = new Weapon(weaponDefinitions.byId["King"], new Character());
export const Default: Story = {
  args: { weapon },
};

export const CustomWidth: Story = {
  args: { weapon, sx: { width: 380 } },
};

const weaponWithMatrices = new Weapon(
  weaponDefinitions.byId["King"],
  new Character(),
);
weaponWithMatrices.matrixSlots.getSlot("mind").matrix = new Matrix(
  getMatrixType("mind"),
  getMatrixDefinition("Alyss"),
  new Character(),
);
weaponWithMatrices.matrixSlots.getSlot("belief").matrix = new Matrix(
  getMatrixType("belief"),
  getMatrixDefinition("Alyss"),
  new Character(),
);
export const WithMatrices: Story = {
  args: { weapon: weaponWithMatrices },
};
