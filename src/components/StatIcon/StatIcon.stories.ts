import type { Meta, StoryObj } from '@storybook/react';

import { StatIcon } from './StatIcon';
import { Element, StatType } from '../../types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof StatIcon> = {
  title: 'Stat Icon',
  component: StatIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatIcon>;

/* Stories in order of in-game gear filter order */
export const Attack: Story = {
  args: {
    statType: StatType.Attack,
    element: Element.None,
  },
};

export const AlteredAttack: Story = {
  args: {
    statType: StatType.Attack,
    element: Element.Altered,
  },
};

export const PhysicalAttack: Story = {
  args: {
    statType: StatType.Attack,
    element: Element.Physical,
  },
};

export const PhysicalAttackPercent: Story = {
  args: {
    statType: StatType.AttackPercent,
    element: Element.Physical,
  },
};

export const FrostAttack: Story = {
  args: {
    statType: StatType.Attack,
    element: Element.Frost,
  },
};

export const FrostAttackPercent: Story = {
  args: {
    statType: StatType.AttackPercent,
    element: Element.Frost,
  },
};

export const FlameAttack: Story = {
  args: {
    statType: StatType.Attack,
    element: Element.Flame,
  },
};

export const FlameAttackPercent: Story = {
  args: {
    statType: StatType.AttackPercent,
    element: Element.Flame,
  },
};

export const VoltAttack: Story = {
  args: {
    statType: StatType.Attack,
    element: Element.Volt,
  },
};

export const VoltAttackPercent: Story = {
  args: {
    statType: StatType.AttackPercent,
    element: Element.Volt,
  },
};

export const Crit: Story = {
  args: {
    statType: StatType.Crit,
    element: Element.None,
  },
};

export const CritPercent: Story = {
  args: {
    statType: StatType.CritPercent,
    element: Element.None,
  },
};

export const PhysicalDamagePercent: Story = {
  args: {
    statType: StatType.DamagePercent,
    element: Element.Physical,
  },
};

export const FrostDamagePercent: Story = {
  args: {
    statType: StatType.DamagePercent,
    element: Element.Frost,
  },
};

export const FlameDamagePercent: Story = {
  args: {
    statType: StatType.DamagePercent,
    element: Element.Flame,
  },
};

export const VoltDamagePercent: Story = {
  args: {
    statType: StatType.DamagePercent,
    element: Element.Volt,
  },
};

export const HP: Story = {
  args: {
    statType: StatType.HP,
    element: Element.None,
  },
};

export const HPPercent: Story = {
  args: {
    statType: StatType.HPPercent,
    element: Element.None,
  },
};

export const PhysicalResistance: Story = {
  args: {
    statType: StatType.Resistance,
    element: Element.Physical,
  },
};

export const PhysicalResistancePercent: Story = {
  args: {
    statType: StatType.ResistancePercent,
    element: Element.Physical,
  },
};

export const FrostResistance: Story = {
  args: {
    statType: StatType.Resistance,
    element: Element.Frost,
  },
};

export const FrostResistancePercent: Story = {
  args: {
    statType: StatType.ResistancePercent,
    element: Element.Frost,
  },
};

export const FlameResistance: Story = {
  args: {
    statType: StatType.Resistance,
    element: Element.Flame,
  },
};

export const FlameResistancePercent: Story = {
  args: {
    statType: StatType.ResistancePercent,
    element: Element.Flame,
  },
};

export const VoltResistance: Story = {
  args: {
    statType: StatType.Resistance,
    element: Element.Volt,
  },
};

export const VoltResistancePercent: Story = {
  args: {
    statType: StatType.ResistancePercent,
    element: Element.Volt,
  },
};

export const AlteredResistance: Story = {
  args: {
    statType: StatType.Resistance,
    element: Element.Altered,
  },
};

export const AlteredResistancePercent: Story = {
  args: {
    statType: StatType.ResistancePercent,
    element: Element.Altered,
  },
};

export const Resistance: Story = {
  args: {
    statType: StatType.Resistance,
    element: Element.None,
  },
};
