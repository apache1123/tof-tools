import { Divider, List, Typography } from "@mui/material";

import type { NavItemModel } from "../NavItem/NavItem";
import { NavItem } from "../NavItem/NavItem";

export interface NavGroupModel {
  id: string;
  title?: string;
  caption?: string;
  children: NavItemModel[];
}

export interface NavGroupProps {
  item: NavGroupModel;
}

export function NavGroup({ item }: NavGroupProps) {
  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="body2"
              display="block"
              fontWeight="bold"
              gutterBottom
              mt={1}
            >
              {item.title}
              {item.caption && (
                <Typography variant="caption" display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {item.children.map((navItem) => (
          <NavItem key={navItem.id} item={navItem} />
        ))}
      </List>

      <Divider sx={{ my: 1 }} />
    </>
  );
}
