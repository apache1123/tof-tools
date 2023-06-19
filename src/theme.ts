import { labels } from '@catppuccin/palette';
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
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: labels.base[catppuccinFlavor].hex,
      paper: labels.surface0[catppuccinFlavor].hex,
    },
    error: {
      main: labels.red[catppuccinFlavor].hex,
    },
    info: {
      main: labels.blue[catppuccinFlavor].hex,
    },
    primary: {
      main: labels.teal[catppuccinFlavor].hex,
    },
    secondary: {
      main: labels.lavender[catppuccinFlavor].hex,
    },
    success: {
      main: labels.green[catppuccinFlavor].hex,
    },
    text: {
      primary: labels.text[catppuccinFlavor].hex,
      secondary: labels.subtext0[catppuccinFlavor].hex,
    },
    warning: {
      main: labels.yellow[catppuccinFlavor].hex,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => theme.unstable_sx({ p: 2 }),
      },
    },
  },
});

export default theme;
