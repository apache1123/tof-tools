import CalculateIcon from "@mui/icons-material/Calculate";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Head from "next/head";
import type { ReactNode } from "react";

import { SectionHeading } from "../src/components/common/SectionHeading/SectionHeading";

const links: {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    title: "Maygi's Team DPS Calculator",
    description:
      "Calculator for analyzing frame data, finding optimal combos, and theorycrafting team comps",
    href: "https://docs.google.com/spreadsheets/d/1ZrJokNh_0AF_9welc7Etz6K8jlpzi5bXpiWz-mQZa78/edit#gid=1482052592",
    icon: <CalculateIcon />,
  },
  {
    title: "Tower of Fantasy Index",
    description:
      "Community online resource for Global and Chinese versions of the game",
    href: "https://toweroffantasy.info/",
    icon: <MenuBookRoundedIcon />,
  },
  {
    title: "Tower of Fantasy Wiki",
    description:
      "Community wiki - English resource centered around the Global version of the game",
    href: "https://toweroffantasy.fandom.com",
    icon: <MenuBookRoundedIcon />,
  },
  {
    title: "Tower of Fantasy Interactive Map",
    description: "",
    href: "https://toweroffantasy.interactivemap.app/",
    icon: <MapRoundedIcon />,
  },
  {
    title: "Tower of Fantasy Interactive Map",
    description:
      "Another interactive map based off the Chinese version of the game",
    href: "https://www.ghzs666.com/tower-of-fantasy-map#/",
    icon: <MapRoundedIcon />,
  },
];

export default function LinksPage() {
  return (
    <>
      <Head>
        <title>Useful Links | Tower of Fantasy Tools</title>
      </Head>

      <Paper sx={{ p: 3 }}>
        <SectionHeading sx={{ mb: 0 }}>Useful links</SectionHeading>

        <List>
          {links.map(({ title, description, href, icon }, index) => (
            <ListItemButton key={index} href={href} target="_blank">
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primary={<Typography color="primary">{title}</Typography>}
                secondary={description}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </>
  );
}
