import type { Meta, StoryObj } from "@storybook/react";

import { StyledModal } from "./StyledModal";

const meta: Meta<typeof StyledModal> = {
  component: StyledModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof StyledModal>;

export const Default: Story = {
  args: {
    modalTitle: "Modal Title",
    modalContent: ModalContent(),
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
