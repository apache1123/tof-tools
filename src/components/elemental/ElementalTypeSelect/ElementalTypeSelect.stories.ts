import type { Meta, StoryObj } from "@storybook/react";

import { allElementalTypes } from "../../../definitions/elemental-type";
import { ElementalTypeSelect } from "./ElementalTypeSelect";

const meta: Meta<typeof ElementalTypeSelect> = {
  component: ElementalTypeSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ElementalTypeSelect>;

export const Empty: Story = {
  args: {
    values: [],
    possibleElements: [...allElementalTypes],
  },
};

export const Selected: Story = {
  args: {
    values: ["Flame"],
    possibleElements: [...allElementalTypes],
  },
};

export const All: Story = {
  args: {
    values: [...allElementalTypes],
    possibleElements: [...allElementalTypes],
  },
};
