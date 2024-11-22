import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

export interface NavItemModel {
  id: string;
  title: string;
  path: string;
  target?: boolean;
}

export interface NavItemProps {
  item: NavItemModel;
}

export function NavItem({ item }: NavItemProps) {
  const theme = useTheme();
  const router = useRouter();

  const target = item.target ? "_blank" : "_self";

  return (
    <ListItemButton
      href={item.path}
      target={target}
      selected={item.path === router.pathname}
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
        pl: 4,
      }}
    >
      <ListItemText
        primary={<Typography variant="body2">{item.title}</Typography>}
      />
    </ListItemButton>
  );
}
