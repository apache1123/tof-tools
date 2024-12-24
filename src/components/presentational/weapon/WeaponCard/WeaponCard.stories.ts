import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Matrix } from "../../../../models/matrix/matrix";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponCard } from "./WeaponCard";

const meta: Meta<typeof WeaponCard> = {
  component: WeaponCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponCard>;

const characterId = "characterId";
const weapon = new Weapon(
  weaponDefinitions.byId["King"],
  characterId,
  undefined,
);

export const Default: Story = {
  args: { weapon },
};

export const CustomWidth: Story = {
  args: { weapon, sx: { width: 380 } },
};

const weaponWithMatrices = new Weapon(
  weaponDefinitions.byId["King"],
  characterId,
  undefined,
);
weaponWithMatrices.matrixSlots.getSlot("mind").matrix = new Matrix(
  getMatrixType("mind"),
  getMatrixDefinition("Alyss"),
  characterId,
);
weaponWithMatrices.matrixSlots.getSlot("belief").matrix = new Matrix(
  getMatrixType("belief"),
  getMatrixDefinition("Alyss"),
  characterId,
);
export const WithMatrices: Story = {
  args: { weapon: weaponWithMatrices },
};
