import { Button } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { StyledModal } from "./StyledModal";

const meta: Meta<typeof StyledModal> = {
  component: StyledModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof StyledModal>;

const modalTitle = "Modal Title";

export const Default: Story = {
  args: {
    modalTitle,
    modalContent: ModalContent(),
    showConfirm: true,
    showCancel: true,
    hideClose: false,
    fullWidth: true,
  },
};

export const WithLeftActions: Story = {
  args: {
    modalTitle,
    modalContent: ModalContent(),

    leftActions: (
      <>
        <Button>Action</Button>
        <Button>Another action</Button>
      </>
    ),
    fullWidth: true,
    showConfirm: true,
    showCancel: true,
  },
};

function ModalContent() {
  return (
    <>
      <div>Some content</div>
      <span>Other content</span>
    </>
  );
}
