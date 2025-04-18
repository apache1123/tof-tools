import type { Meta, StoryObj } from "@storybook/react";

import {
  exampleTeamPreset,
  exampleTeamPresetEmpty,
} from "../../__fixtures__/team-preset";
import { TeamPresetCard } from "./TeamPresetCard";

const meta: Meta<typeof TeamPresetCard> = {
  component: TeamPresetCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TeamPresetCard>;

export const Default: Story = {
  args: { teamPreset: exampleTeamPreset },
};

export const Empty: Story = {
  args: { teamPreset: exampleTeamPresetEmpty },
};
