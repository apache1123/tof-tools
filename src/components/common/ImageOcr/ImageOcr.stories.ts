import type { Meta, StoryObj } from "@storybook/react";
import { createWorker } from "tesseract.js";

import { ImageOcr } from "./ImageOcr";

const meta: Meta<typeof ImageOcr> = {
  component: ImageOcr,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageOcr>;

const ocrWorker = await createWorker("eng");

export const Initial: Story = {
  args: { ocrWorker },
};

export const WorkerLoading: Story = {};
