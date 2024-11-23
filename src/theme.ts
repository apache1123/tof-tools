import { flavors } from "@catppuccin/palette";
import { pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const catppuccinFlavor = flavors.macchiato;
const { colors } = catppuccinFlavor;

// Create a theme instance.
let theme = createTheme({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- custom colors defined below
  // @ts-ignore
  palette: {
    mode: "dark",
    background: {
      default: colors.base.hex,
    },
    text: {
      primary: colors.text.hex,
      secondary: colors.subtext0.hex,
    },
    common: {
      white: colors.text.hex,
      black: colors.mantle.hex,
    },
    divider: colors.surface0.hex,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        sx: { p: 2 },
      },
      styleOverrides: {
        elevation0: {
          background: colors.base.hex,
        },
        elevation1: {
          background: colors.surface0.hex,
        },
        elevation2: {
          background: colors.surface1.hex,
        },
        elevation3: {
          background: colors.surface2.hex,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          backgroundColor: colors.surface0.hex,
        },
      },
    },
  },
});

theme = createTheme(theme, {
  palette: {
    secondaryBackground: {
      default: colors.mantle.hex,
    },
    error: theme.palette.augmentColor({
      color: {
        main: colors.red.hex,
      },
    }),
    info: theme.palette.augmentColor({
      color: {
        main: colors.blue.hex,
      },
    }),
    primary: theme.palette.augmentColor({
      color: {
        main: colors.teal.hex,
      },
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: colors.pink.hex,
      },
    }),
    success: theme.palette.augmentColor({
      color: {
        main: colors.green.hex,
      },
    }),
    warning: theme.palette.augmentColor({
      color: {
        main: colors.flamingo.hex,
      },
    }),
    flame: theme.palette.augmentColor({
      color: {
        main: colors.peach.hex,
      },
    }),
    frost: theme.palette.augmentColor({
      color: {
        main: colors.sky.hex,
      },
    }),
    physical: theme.palette.augmentColor({
      color: {
        main: colors.yellow.hex,
      },
    }),
    volt: theme.palette.augmentColor({
      color: {
        main: colors.mauve.hex,
      },
    }),
    titan: theme.palette.augmentColor({
      color: {
        main: pink[300],
      },
    }),
    // Catppuccin colors
    rosewater: theme.palette.augmentColor({
      color: { main: colors.rosewater.hex },
    }),
    flamingo: theme.palette.augmentColor({
      color: { main: colors.flamingo.hex },
    }),
    pink: theme.palette.augmentColor({
      color: { main: colors.pink.hex },
    }),
    mauve: theme.palette.augmentColor({
      color: { main: colors.mauve.hex },
    }),
    red: theme.palette.augmentColor({
      color: { main: colors.red.hex },
    }),
    maroon: theme.palette.augmentColor({
      color: { main: colors.maroon.hex },
    }),
    peach: theme.palette.augmentColor({
      color: { main: colors.peach.hex },
    }),
    yellow: theme.palette.augmentColor({
      color: { main: colors.yellow.hex },
    }),
    green: theme.palette.augmentColor({
      color: { main: colors.green.hex },
    }),
    teal: theme.palette.augmentColor({
      color: { main: colors.teal.hex },
    }),
    sky: theme.palette.augmentColor({
      color: { main: colors.sky.hex },
    }),
    sapphire: theme.palette.augmentColor({
      color: { main: colors.sapphire.hex },
    }),
    blue: theme.palette.augmentColor({
      color: { main: colors.blue.hex },
    }),
    lavender: theme.palette.augmentColor({
      color: { main: colors.lavender.hex },
    }),
    // Catppuccin text
    subtext1: theme.palette.augmentColor({
      color: { main: colors.subtext1.hex },
    }),
    subtext0: theme.palette.augmentColor({
      color: { main: colors.subtext0.hex },
    }),
    // Catppuccin surfaces
    overlay2: theme.palette.augmentColor({
      color: { main: colors.overlay2.hex },
    }),
    overlay1: theme.palette.augmentColor({
      color: { main: colors.overlay1.hex },
    }),
    overlay0: theme.palette.augmentColor({
      color: { main: colors.overlay0.hex },
    }),
    surface2: theme.palette.augmentColor({
      color: { main: colors.surface2.hex },
    }),
    surface1: theme.palette.augmentColor({
      color: { main: colors.surface1.hex },
    }),
    surface0: theme.palette.augmentColor({
      color: { main: colors.surface0.hex },
    }),
    base: theme.palette.augmentColor({
      color: { main: colors.base.hex },
    }),
    mantle: theme.palette.augmentColor({
      color: { main: colors.mantle.hex },
    }),
    crust: theme.palette.augmentColor({
      color: { main: colors.crust.hex },
    }),
  },
});

declare module "@mui/material/styles" {
  interface PaletteOptions {
    secondaryBackground: PaletteOptions["background"];
    flame: PaletteOptions["primary"];
    frost: PaletteOptions["primary"];
    physical: PaletteOptions["primary"];
    volt: PaletteOptions["primary"];
    titan: PaletteOptions["primary"];
    // Catppuccin colors
    rosewater: PaletteOptions["primary"];
    flamingo: PaletteOptions["primary"];
    pink: PaletteOptions["primary"];
    mauve: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    maroon: PaletteOptions["primary"];
    peach: PaletteOptions["primary"];
    yellow: PaletteOptions["primary"];
    green: PaletteOptions["primary"];
    teal: PaletteOptions["primary"];
    sky: PaletteOptions["primary"];
    sapphire: PaletteOptions["primary"];
    blue: PaletteOptions["primary"];
    lavender: PaletteOptions["primary"];
    // Catppuccin text
    subtext1: PaletteOptions["primary"];
    subtext0: PaletteOptions["primary"];
    // Catppuccin surfaces
    overlay2: PaletteOptions["primary"];
    overlay1: PaletteOptions["primary"];
    overlay0: PaletteOptions["primary"];
    surface2: PaletteOptions["primary"];
    surface1: PaletteOptions["primary"];
    surface0: PaletteOptions["primary"];
    base: PaletteOptions["primary"];
    mantle: PaletteOptions["primary"];
    crust: PaletteOptions["primary"];
  }

  interface Palette {
    secondaryBackground: Palette["background"];
    flame: Palette["primary"];
    frost: Palette["primary"];
    physical: Palette["primary"];
    volt: Palette["primary"];
    titan: Palette["primary"];
    // Catppuccin colors
    rosewater: Palette["primary"];
    flamingo: Palette["primary"];
    pink: Palette["primary"];
    mauve: Palette["primary"];
    red: Palette["primary"];
    maroon: Palette["primary"];
    peach: Palette["primary"];
    yellow: Palette["primary"];
    green: Palette["primary"];
    teal: Palette["primary"];
    sky: Palette["primary"];
    sapphire: Palette["primary"];
    blue: Palette["primary"];
    lavender: Palette["primary"];
    // Catppuccin text
    subtext1: Palette["primary"];
    subtext0: Palette["primary"];
    // Catppuccin surfaces
    overlay2: Palette["primary"];
    overlay1: Palette["primary"];
    overlay0: Palette["primary"];
    surface2: Palette["primary"];
    surface1: Palette["primary"];
    surface0: Palette["primary"];
    base: Palette["primary"];
    mantle: Palette["primary"];
    crust: Palette["primary"];
  }
}

declare module "@mui/material/Switch" {
  interface SwitchPropsColorOverrides {
    titan: true;
  }
}

export default theme;
