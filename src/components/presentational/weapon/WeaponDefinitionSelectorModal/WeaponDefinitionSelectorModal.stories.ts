import type { Meta, StoryObj } from "@storybook/react";

import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionSelectorModal } from "./WeaponDefinitionSelectorModal";

const meta: Meta<typeof WeaponDefinitionSelectorModal> = {
  title: "Weapon Definition Selector Modal",
  component: WeaponDefinitionSelectorModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WeaponDefinitionSelectorModal>;

export const Default: Story = {
  args: {
    weaponDefinitions: weaponDefinitions.allIds.map(
      (id) => weaponDefinitions.byId[id],
    ),
  },
};
