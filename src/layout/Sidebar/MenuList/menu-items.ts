import { routes } from "../../../../routes/routes";
import type { NavGroupModel } from "./NavGroup/NavGroup";

export const menuItems: NavGroupModel[] = [
  {
    id: "character",
    title: "Wanderer",
    children: [
      {
        id: "character-info",
        title: "Wanderer Info",
        path: "/",
      },
      {
        id: "loadouts",
        title: routes.loadouts.label,
        path: routes.loadouts.path,
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
