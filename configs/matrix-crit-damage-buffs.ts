import { MatrixBuff } from '../src/models/buff';

export const matrixCritDamageBuffs: MatrixBuff[] = [
  {
    name: 'Fenrir 2pc',
    starValues: [
      { star: 0, value: 0.14 },
      { star: 1, value: 0.15 },
      { star: 2, value: 0.16 },
      { star: 3, value: 0.18 },
    ],
  },
  {
    name: 'Annabella 4pc',
    starValues: [
      { star: 0, value: 0.12 },
      { star: 1, value: 0.14 },
      { star: 2, value: 0.16 },
      { star: 3, value: 0.18 },
    ],
  },
  {
    name: 'Crow 2pc',
    starValues: [
      { star: 0, value: 0.144 },
      { star: 1, value: 0.18 },
      { star: 2, value: 0.216 },
      { star: 3, value: 0.252 },
    ],
    description: 'Increase crit dmg 24%/30%/36%/42% to targets under 60% HP',
  },
];
