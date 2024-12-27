import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { exampleAllMatrices } from "../../../__fixtures__/matrix";
import { exampleWeapon } from "../../../__fixtures__/weapon";
import { exampleAllWeaponPresets } from "../../../__fixtures__/weapon-preset";
import { WeaponEditor } from "./WeaponEditor";

const meta: Meta<typeof WeaponEditor> = {
  component: WeaponEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponEditor>;

const weaponProxy = proxy(exampleWeapon);
const allMatrixProxies = proxy(exampleAllMatrices);
const weaponPresetProxies = proxy(exampleAllWeaponPresets);

export const Default: Story = {
  args: { weaponProxy, allMatrixProxies, weaponPresetProxies },
};
