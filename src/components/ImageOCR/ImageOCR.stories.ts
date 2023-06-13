import type { Meta, StoryObj } from '@storybook/react';

import { ImageOCR } from './ImageOCR';

const meta: Meta<typeof ImageOCR> = {
  title: 'Image OCR',
  component: ImageOCR,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageOCR>;

export const Initial: Story = {};
