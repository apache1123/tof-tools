import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

const buttonContent = "Button";

export const Default: Story = {
  args: { children: buttonContent },
};

export const ButtonWithIcon: Story = {
  args: {
    children: buttonContent,
    icon: <DeleteForeverIcon />,
  },
};

export const IconButton: Story = {
  args: {
    children: buttonContent,
    icon: <DeleteForeverIcon />,
    iconButton: true,
  },
};
