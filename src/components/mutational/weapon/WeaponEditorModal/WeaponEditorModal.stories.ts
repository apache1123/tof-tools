import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { Matrix } from "../../../../models/matrix/matrix";
import { Weapon } from "../../../../models/weapon/weapon";
import { WeaponEditorModal } from "./WeaponEditorModal";

const meta: Meta<typeof WeaponEditorModal> = {
  title: "Weapon Editor Modal",
  component: WeaponEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponEditorModal>;

const characterId = "characterId";
const weaponProxy = proxy(
  new Weapon(weaponDefinitions.byId["King"], characterId),
);
const allMatricesProxy = proxy([
  new Matrix(getMatrixType("mind"), getMatrixDefinition("Alyss"), characterId),
  new Matrix(getMatrixType("mind"), getMatrixDefinition("Anka"), characterId),
  new Matrix(
    getMatrixType("memory"),
    getMatrixDefinition("Meryl Ironheart"),
    characterId,
  ),
]);

export const Default: Story = {
  args: { weaponProxy, allMatricesProxy },
};
