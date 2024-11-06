export interface StarRequirement {
  minStarRequirement: number;
  maxStarRequirement: number;
}

export function hasMetStarRequirement(
  requirement: StarRequirement,
  stars: number,
) {
  return (
    stars >= requirement.minStarRequirement &&
    stars <= requirement.maxStarRequirement
  );
}
