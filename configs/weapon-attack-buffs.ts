import { Buff } from '../src/models/buff';

export const weaponAttackBuffs: Buff[] = [
  {
    name: 'Elemental Resonance',
    value: 0.15,
    description: 'Elemental resonance on most limited weapons',
  },
  {
    name: 'Altered Resonance',
    value: 0.2,
    description: 'Fiona + another altered (e.g. Lin)',
  },
  {
    name: 'Elemental Balancing',
    value: 0.15,
    description: '(Fenrir) 3 weapons of different elements',
  },
  {
    name: 'Fiona',
    value: 0.15,
    description: '15% ATK for 30s on discharge',
  },
  {
    name: 'Lin 0* - 5*',
    value: 0.15,
    description: 'Moonlight Realm gives 15% ATK for its duration',
  },
  {
    name: 'Lin 6*',
    value: 0.23,
    description: 'Gives 23% ATK in total.',
  },
  {
    name: 'Lin Frost Bonus',
    value: 0.1,
    description: 'Frost Moonlight Realm gives 10% additional ATK',
  },
  {
    name: 'Frigg 0* - 5*',
    value: 0.15,
    description: 'Frost Domain is up 25/30 seconds',
  },
  {
    name: 'Frigg 6*',
    value: 0.4,
    description: 'Gives 40% ATK in total.',
  },
  {
    name: 'Ruby',
    value: 0.1,
    description: 'Ultimate Heat gives 10% ATK after fully stacked',
  },
  {
    name: 'Nemesis 5*',
    value: 0.1,
    description: '10% ATK for having 1 electrode out',
  },
  {
    name: 'Nemesis 6*',
    value: 0.15,
    description: '15% ATK for having 2 electrodes out',
  },
];
