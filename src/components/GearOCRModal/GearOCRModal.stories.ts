import type { Meta, StoryObj } from '@storybook/react';

import { GearOCRModal } from './GearOCRModal';

const meta: Meta<typeof GearOCRModal> = {
  title: 'Gear OCR Modal',
  component: GearOCRModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GearOCRModal>;

export const Initial: Story = {};
