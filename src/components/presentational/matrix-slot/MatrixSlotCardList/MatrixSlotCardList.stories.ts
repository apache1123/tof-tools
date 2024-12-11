import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../../models/matrix/matrix";
import { MatrixSlots } from "../../../../models/matrix/matrix-slots";
import { MatrixSlotCardList } from "./MatrixSlotCardList";

const meta: Meta<typeof MatrixSlotCardList> = {
  title: "Matrix Slot Card List",
  component: MatrixSlotCardList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotCardList>;

const matrixSlots = new MatrixSlots();
matrixSlots.getSlot("belief").matrix = new Matrix(
  getMatrixType("belief"),
  getMatrixDefinition("Alyss"),
  "characterId",
);

export const Default: Story = {
  args: { matrixSlots },
};
