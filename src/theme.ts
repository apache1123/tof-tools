import { labels } from '@catppuccin/palette';
import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const catppuccinFlavor = 'macchiato';

// Create a theme instance.
let theme = createTheme({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- custom colors defined below
  // @ts-ignore
  palette: {
    mode: 'dark',
    background: {
      default: labels.base[catppuccinFlavor].hex,
      paper: labels.surface0[catppuccinFlavor].hex,
    },
    text: {
      primary: labels.text[catppuccinFlavor].hex,
      secondary: labels.subtext0[catppuccinFlavor].hex,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

theme = createTheme(theme, {
  palette: {
    error: theme.palette.augmentColor({
      color: {
        main: labels.red[catppuccinFlavor].hex,
      },
    }),
    info: theme.palette.augmentColor({
      color: {
        main: labels.blue[catppuccinFlavor].hex,
      },
    }),
    primary: theme.palette.augmentColor({
      color: {
        main: labels.teal[catppuccinFlavor].hex,
      },
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: labels.pink[catppuccinFlavor].hex,
      },
    }),
    success: theme.palette.augmentColor({
      color: {
        main: labels.green[catppuccinFlavor].hex,
      },
    }),
    warning: theme.palette.augmentColor({
      color: {
        main: labels.flamingo[catppuccinFlavor].hex,
      },
    }),
    flame: theme.palette.augmentColor({
      color: {
        main: labels.peach[catppuccinFlavor].hex,
      },
    }),
    frost: theme.palette.augmentColor({
      color: {
        main: labels.sky[catppuccinFlavor].hex,
      },
    }),
    physical: theme.palette.augmentColor({
      color: {
        main: labels.yellow[catppuccinFlavor].hex,
      },
    }),
    volt: theme.palette.augmentColor({
      color: {
        main: labels.mauve[catppuccinFlavor].hex,
      },
    }),
    titan: theme.palette.augmentColor({
      color: {
        main: pink[300],
      },
    }),
  },
});

declare module '@mui/material/styles' {
  interface PaletteOptions {
    flame: PaletteOptions['primary'];
    frost: PaletteOptions['primary'];
    physical: PaletteOptions['primary'];
    volt: PaletteOptions['primary'];
    titan: PaletteOptions['primary'];
  }

  interface Palette {
    flame: Palette['primary'];
    frost: Palette['primary'];
    physical: Palette['primary'];
    volt: Palette['primary'];
    titan: Palette['primary'];
  }
}

export default theme;
