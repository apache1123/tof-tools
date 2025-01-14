import { routes } from "../../../../routes/routes";
import type { NavGroupModel } from "./NavGroup/NavGroup";

export const menuItems: NavGroupModel[] = [
  {
    id: "wanderer",
    title: "Wanderer",
    children: [
      {
        id: "presets",
        title: routes.presets.label,
        path: routes.presets.path,
      },
      {
        id: "gears",
        title: routes.gears.label,
        path: routes.gears.path,
      },
      {
        id: "gear-set-presets",
        title: routes.gearSetPresets.label,
        path: routes.gearSetPresets.path,
      },
      {
        id: "weapons",
        title: routes.weapons.label,
        path: routes.weapons.path,
      },
      {
        id: "matrices",
        title: routes.matrices.label,
        path: routes.matrices.path,
      },
      {
        id: "teams",
        title: routes.teams.label,
        path: routes.teams.path,
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    children: [
      {
        id: "gear-comparer",
        title: routes.gearComparer.label,
        path: routes.gearComparer.path,
      },
      {
        id: "damage-calculator",
        title: routes.damageCalculator.label,
        path: routes.damageCalculator.path,
      },
    ],
  },
  {
    id: "references",
    title: "Reference",
    children: [
      {
        id: "stats",
        title: routes.stats.label,
        path: routes.stats.path,
      },
      {
        id: "links",
        title: routes.links.label,
        path: routes.links.path,
      },
    ],
  },
  {
    id: "others",
    children: [
      {
        id: "settings",
        title: routes.settings.label,
        path: routes.settings.path,
      },
    ],
  },
];
