import QuestionMark from "@mui/icons-material/QuestionMark";
import Image from "next/image";

import type { StatTypeElementalType } from "../../../../definitions/elemental-type";
import type { StatRole } from "../../../../definitions/stat-types";

function getImageName(
  role: StatRole,
  element: StatTypeElementalType,
): string | undefined {
  switch (role) {
    case "Attack":
    case "Attack %":
    case "Damage %":
      if (element === "All") return "attack";
      if (element === "Altered") return "altered-attack";

      // Flame, Frost, Physical, Volt
      return `${element.toLowerCase()}-attack-colored`;
    case "Crit":
    case "Crit %":
      return "crit";
    case "Resistance":
    case "Resistance %":
      if (element === "All") return "res";

      // Altered, Flame, Frost, Physical, Volt
      return `${element.toLowerCase()}-res`;
    case "HP":
    case "HP %":
      return `hp`;
    default:
      return undefined;
  }
}

interface StatTypeIconProps {
  role: StatRole | undefined;
  element: StatTypeElementalType | undefined;
  size?: number;
}

export const StatTypeIcon = ({
  role,
  element,
  size = 30,
}: StatTypeIconProps) => {
  if (role && element) {
    const imageName = getImageName(role, element);
    const imagePath = `/icons/stats/${imageName}.png`;

    return imageName ? (
      <Image src={imagePath} alt={imageName} width={size} height={size}></Image>
    ) : (
      <UnknownStatTypeIcon size={size} />
    );
  } else {
    return <UnknownStatTypeIcon size={size} />;
  }
};

function UnknownStatTypeIcon({ size }: { size?: number }) {
  return <QuestionMark width={size} height={size} />;
}
