import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Character } from "../../../../models/character/character";
import { Matrix } from "../../../../models/matrix/matrix";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponEditor } from "./WeaponEditor";

const meta: Meta<typeof WeaponEditor> = {
  title: "Weapon Editor",
  component: WeaponEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponEditor>;

const character = new Character();
const weaponProxy = proxy(
  new Weapon(weaponDefinitions.byId["King"], character),
);
const allMatricesProxy = proxy([
  new Matrix(getMatrixType("mind"), getMatrixDefinition("Alyss"), character),
  new Matrix(getMatrixType("mind"), getMatrixDefinition("Anka"), character),
  new Matrix(
    getMatrixType("memory"),
    getMatrixDefinition("Meryl Ironheart"),
    character,
  ),
]);

export const Default: Story = {
  args: { weaponProxy, allMatricesProxy },
};
