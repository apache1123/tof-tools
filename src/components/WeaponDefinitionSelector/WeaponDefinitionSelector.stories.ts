import type { Meta, StoryObj } from '@storybook/react';

import { weaponDefinitions,WeaponName } from '../../constants/weapon-definitions';
import { WeaponDefinitionSelector } from './WeaponDefinitionSelector';

const meta: Meta<typeof WeaponDefinitionSelector> = {
  title: 'Weapon Definition Selector',
  component: WeaponDefinitionSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WeaponDefinitionSelector>;

export const Empty: Story = {
  args: {
    selectedWeaponDefinition: undefined,
  },
};

export const Preselected: Story = {
  args: {
    selectedWeaponDefinition: weaponDefinitions.byId[WeaponName.Fenrir]
  }
}
