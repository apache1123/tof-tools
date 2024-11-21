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
    divider: colors.overlay0.hex,
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
  }

  interface Palette {
    secondaryBackground: Palette["background"];
    flame: Palette["primary"];
    frost: Palette["primary"];
    physical: Palette["primary"];
    volt: Palette["primary"];
    titan: Palette["primary"];
  }
}

declare module "@mui/material/Switch" {
  interface SwitchPropsColorOverrides {
    titan: true;
  }
}

export default theme;
