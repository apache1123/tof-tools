import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { exampleMatrix } from "../../../__fixtures__/matrix";
import { MatrixEditorModal } from "./MatrixEditorModal";

const meta: Meta<typeof MatrixEditorModal> = {
  component: MatrixEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixEditorModal>;

const matrixProxy = proxy(exampleMatrix);
export const Default: Story = {
  args: { matrixProxy },
};
