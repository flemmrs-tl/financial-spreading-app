import { createTheme } from '@mui/material/styles';

// Trade Ledger brand colors from style guide
const COLORS = {
  // Primary colors
  primary: {
    main: '#076CF2', // Trade Ledger blue
    light: '#4791db',
    dark: '#05122E', // Trade Ledger dark blue
    contrastText: '#fff',
  },
  // Complementary color
  secondary: {
    main: '#E76C23', // Trade Ledger orange
    light: '#ff9651',
    dark: '#c33f00',
    contrastText: '#fff',
  },
  // Accent colors
  accent: {
    purple: '#8064A2',
    magenta: '#A64D79',
    yellow: '#EEFF41',
  },
  // Text colors
  text: {
    primary: '#1F232E',
    secondary: '#666666',
  },
  // Background colors
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
    darkShade: '#EFEFEF',
  }
};

export const theme = createTheme({
  palette: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    text: COLORS.text,
    background: COLORS.background,
  },
  typography: {
    fontFamily: [
      'Inter', // As recommended in the brand guide
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: COLORS.primary.main,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: COLORS.primary.main,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: COLORS.primary.main,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: COLORS.primary.main,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: COLORS.primary.main,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: COLORS.primary.main,
    },
    body1: {
      fontSize: '1rem',
      color: COLORS.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      color: COLORS.text.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: COLORS.primary.main,
          '&:hover': {
            backgroundColor: COLORS.primary.dark,
          },
        },
        containedSecondary: {
          backgroundColor: COLORS.secondary.main,
          '&:hover': {
            backgroundColor: COLORS.secondary.dark,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
          backgroundColor: COLORS.primary.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: COLORS.primary.main,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});