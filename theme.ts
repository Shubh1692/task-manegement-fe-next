'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#f22c4d",
      light: "#ffffff",
    },
    secondary: {
      main: "#004cc6",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontDisplay: "swap",
          fontStyle: "normal"
        },
      },
    },
  },
});

export default theme;