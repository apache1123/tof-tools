import Image from 'next/image';
import { Element, StatType } from '../../types';

interface StatIconProps {
  statType: StatType;
  element: Element;
  size?: number;
}

export const StatIcon = ({ statType, element, size = 30 }: StatIconProps) => {
  let imageName;
  switch (statType) {
    case StatType.Attack:
    case StatType.AttackPercent:
    case StatType.DamagePercent:
      switch (element) {
        case Element.Altered:
          imageName = 'altered-attack';
          break;
        case Element.Flame:
          imageName = 'flame-attack';
          break;
        case Element.Frost:
          imageName = 'frost-attack';
          break;
        case Element.Volt:
          imageName = 'volt-attack';
          break;
        case Element.Physical:
        case Element.None:
        default:
          imageName = 'attack';
          break;
      }
      break;
    case StatType.Crit:
    case StatType.CritPercent:
      imageName = 'crit';
      break;
    case StatType.HP:
    case StatType.HPPercent:
      imageName = 'hp';
      break;
    case StatType.Resistance:
    case StatType.ResistancePercent:
      switch (element) {
        case Element.Altered:
          imageName = 'altered-res';
          break;
        case Element.Flame:
          imageName = 'flame-res';
          break;
        case Element.Frost:
          imageName = 'frost-res';
          break;
        case Element.Volt:
          imageName = 'volt-res';
          break;
        case Element.Physical:
          imageName = 'phys-res';
          break;
        case Element.None:
        default:
          imageName = 'res';
          break;
      }
      break;
    default:
      break;
  }

  const imagePath = `/icons/stats/${imageName}.png`;

  return (
    <Image src={imagePath} alt={imageName} width={size} height={size}></Image>
  );
};
