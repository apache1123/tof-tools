import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import type { Meta, StoryObj } from "@storybook/react";

import { ButtonModal } from "./ButtonModal";

const meta: Meta<typeof ButtonModal> = {
  component: ButtonModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ButtonModal>;

const buttonText = "Button";

export const Default: Story = {
  args: { buttonText },
};

export const ButtonWithIcon: Story = {
  args: {
    buttonText,
    icon: <DeleteForeverIcon />,
  },
};

export const IconButton: Story = {
  args: {
    buttonText,
    icon: <DeleteForeverIcon />,
    iconButton: true,
  },
};

export const OpenByDefault: Story = {
  args: {
    buttonText,
    openByDefault: true,
  },
};
