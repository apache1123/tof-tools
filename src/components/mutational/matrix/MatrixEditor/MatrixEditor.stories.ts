import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { exampleMatrix1 } from "../../../__fixtures__/matrix";
import { MatrixEditor } from "./MatrixEditor";

const meta: Meta<typeof MatrixEditor> = {
  component: MatrixEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixEditor>;

const matrixProxy = proxy(exampleMatrix1);
export const Default: Story = {
  args: { matrixProxy },
};
