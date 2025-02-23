import type { Meta, StoryObj } from "@storybook/react";

import { getGearType, getGearTypeOrder } from "../../../definitions/gear-types";
import type { GearType } from "../../../models/gear/gear-type";
import { GearTypeSelector } from "./GearTypeSelector";

const meta: Meta<typeof GearTypeSelector> = {
  component: GearTypeSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearTypeSelector>;

const selectedGearType = {
  id: "Helmet",
  displayName: "Helmet",
} as GearType;

const customOptions = getGearTypeOrder().map((id) => ({
  gearType: getGearType(id),
  isTitan: true,
}));

export const NoGearTypeSelected: Story = {};

export const SelectedGearType: Story = {
  args: {
    selectedGearType: selectedGearType,
  },
};

export const Disabled: Story = {
  args: {
    selectedGearType: selectedGearType,
    disabled: true,
  },
};

export const CustomOptions: Story = {
  args: {
    selectedGearType: selectedGearType,
    options: customOptions,
  },
};
