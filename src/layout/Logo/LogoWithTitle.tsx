import { Box, Link, Typography } from "@mui/material";

import { Logo } from "./Logo";

export function LogoWithTitle() {
  return (
    <Box sx={{ display: "flex" }} alignItems="center">
      <Link
        href="/"
        underline="none"
        sx={{ mt: "6px", display: "flex", alignItems: "center" }}
      >
        <Logo />
        <Typography
          variant="h6"
          sx={{ ml: 1.5, color: (theme) => theme.palette.primary.main }}
        >
          ToF Tools
        </Typography>
      </Link>
    </Box>
  );
}
