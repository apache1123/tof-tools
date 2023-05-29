import { Element, Stat, StatType } from '../src/types';

const stats: Stat[] = [
  {
    name: 'Altered Attack',
    range: { base: 69, min: 239, max: 623 },
    type: StatType.Attack,
    element: Element.Altered,
  },
  {
    name: 'Altered Resistance',
    range: { base: 215, min: 390, max: 974 },
    type: StatType.Resistance,
    element: Element.Altered,
  },
  {
    name: 'Attack',
    range: { base: 52, min: 93, max: 234 },
    type: StatType.Attack,
    element: Element.All,
  },
  {
    name: 'Crit',
    range: { base: 258, min: 468, max: 1169 },
    type: StatType.Crit,
  },
  {
    name: 'Crit Rate %',
    range: { base: 0.0105, min: 0.0119, max: 0.0119 },
    type: StatType.CritPercent,
  },
  {
    name: 'Flame Attack',
    range: { base: 69, min: 125, max: 312 },
    type: StatType.Attack,
    element: Element.Flame,
  },
  {
    name: 'Flame Attack %',
    range: { base: 0.0126, min: 0.0144, max: 0.0144 },
    type: StatType.AttackPercent,
    element: Element.Flame,
  },
  {
    name: 'Flame Damage %',
    range: { base: 0.0065, min: 0.0072, max: 0.0072 },
    type: StatType.DamagePercent,
    element: Element.Flame,
  },
  {
    name: 'Flame Resistance',
    range: { base: 215, min: 390, max: 974 },
    type: StatType.Resistance,
    element: Element.Flame,
  },
  {
    name: 'Flame Resistance %',
    range: { base: 0.0787, min: 0.09, max: 0.09 },
    type: StatType.ResistancePercent,
    element: Element.Flame,
  },
  {
    name: 'Frost Attack',
    range: { base: 69, min: 125, max: 312 },
    type: StatType.Attack,
    element: Element.Frost,
  },
  {
    name: 'Frost Attack %',
    range: { base: 0.0126, min: 0.0144, max: 0.0144 },
    type: StatType.AttackPercent,
    element: Element.Frost,
  },
  {
    name: 'Frost Damage %',
    range: { base: 0.0065, min: 0.0072, max: 0.0072 },
    type: StatType.DamagePercent,
    element: Element.Frost,
  },
  {
    name: 'Frost Resistance',
    range: { base: 215, min: 390, max: 974 },
    type: StatType.Resistance,
    element: Element.Frost,
  },
  {
    name: 'Frost Resistance %',
    range: { base: 0.0787, min: 0.09, max: 0.09 },
    type: StatType.ResistancePercent,
    element: Element.Frost,
  },
  {
    name: 'HP',
    range: { base: 4125, min: 7480, max: 18700 },
    type: StatType.HP,
  },
  {
    name: 'HP %',
    range: { base: 0.0094, min: 0.0108, max: 0.0108 },
    type: StatType.HPPercent,
  },
  {
    name: 'Physical Attack',
    range: { base: 69, min: 125, max: 312 },
    type: StatType.Attack,
    element: Element.Physical,
  },
  {
    name: 'Physical Attack %',
    range: { base: 0.0126, min: 0.0144, max: 0.0144 },
    type: StatType.AttackPercent,
    element: Element.Physical,
  },
  {
    name: 'Physical Damage %',
    range: { base: 0.0065, min: 0.0072, max: 0.0072 },
    type: StatType.DamagePercent,
    element: Element.Physical,
  },
  {
    name: 'Physical Resistance',
    range: { base: 215, min: 390, max: 974 },
    type: StatType.Resistance,
    element: Element.Physical,
  },
  {
    name: 'Physical Resistance %',
    range: { base: 0.0787, min: 0.09, max: 0.09 },
    type: StatType.ResistancePercent,
    element: Element.Physical,
  },
  {
    name: 'Resistance',
    range: { base: 64, min: 117, max: 292 },
    type: StatType.Resistance,
    element: Element.All,
  },
  {
    name: 'Volt Attack',
    range: { base: 69, min: 125, max: 312 },
    type: StatType.Attack,
    element: Element.Volt,
  },
  {
    name: 'Volt Attack %',
    range: { base: 0.0126, min: 0.0144, max: 0.0144 },
    type: StatType.AttackPercent,
    element: Element.Volt,
  },
  {
    name: 'Volt Damage %',
    range: { base: 0.0065, min: 0.0072, max: 0.0072 },
    type: StatType.DamagePercent,
    element: Element.Volt,
  },
  {
    name: 'Volt Resistance',
    range: { base: 215, min: 390, max: 974 },
    type: StatType.Resistance,
    element: Element.Volt,
  },
  {
    name: 'Volt Resistance %',
    range: { base: 0.0787, min: 0.09, max: 0.09 },
    type: StatType.ResistancePercent,
    element: Element.Volt,
  },
];

export default stats;
