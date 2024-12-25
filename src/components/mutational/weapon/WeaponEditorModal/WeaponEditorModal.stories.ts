import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { exampleAllMatrices } from "../../../__fixtures__/matrix";
import { exampleWeapon } from "../../../__fixtures__/weapon";
import { WeaponEditorModal } from "./WeaponEditorModal";

const meta: Meta<typeof WeaponEditorModal> = {
  component: WeaponEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponEditorModal>;

const weaponProxy = proxy(exampleWeapon);
const allMatrixProxies = proxy(exampleAllMatrices);

export const Default: Story = {
  args: { weaponProxy, allMatrixProxies },
};
