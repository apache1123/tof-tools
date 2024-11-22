import { Box, Link, Typography } from "@mui/material";

import { Logo } from "./Logo";

export function LogoWithTitle() {
  return (
    <Box sx={{ display: "flex" }} alignItems="center">
      <Link href="/public" underline="none" sx={{ mt: "6px" }}>
        <Logo />
      </Link>
      <Typography variant="h6" ml={1.5}>
        ToF Tools
      </Typography>
    </Box>
  );
}
