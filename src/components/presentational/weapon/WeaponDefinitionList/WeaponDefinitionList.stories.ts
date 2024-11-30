import type { Meta, StoryObj } from "@storybook/react";

import { weaponDefinitions } from "../../../../definitions/weapons/weapon-definitions";
import { WeaponDefinitionList } from "./WeaponDefinitionList";

const meta: Meta<typeof WeaponDefinitionList> = {
  title: "Weapon Definition List",
  component: WeaponDefinitionList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof WeaponDefinitionList>;

export const Default: Story = {
  args: {
    weaponDefinitions: weaponDefinitions.allIds.map(
      (id) => weaponDefinitions.byId[id],
    ),
  },
};
