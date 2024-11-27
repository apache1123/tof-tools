import { Box, Link, Typography } from "@mui/material";

import { Logo } from "./Logo";

export function LogoWithTitle() {
  return (
    <Box sx={{ display: "flex" }} alignItems="center">
      <Link href="/public" underline="none" sx={{ mt: "6px" }}>
        <Logo />
      </Link>
      <Typography
        variant="h6"
        sx={{ ml: 1.5, color: (theme) => theme.palette.primary.main }}
      >
        ToF Tools
      </Typography>
    </Box>
  );
}
