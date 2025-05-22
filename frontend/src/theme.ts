import { createTheme } from '@mui/material/styles';

// Trade Ledger brand colors from brand guidelines
const brandColors = {
  primary: {
    main: '#076CF2', // Primary Trade Ledger blue
    light: '#3389F5',
    dark: '#05122E', // Dark navy blue from Trade Ledger palette
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#E76C23', // Complementary orange from Trade Ledger palette
    light: '#F08749',
    dark: '#BF5114',
    contrastText: '#FFFFFF',
  },
  accent: {
    purple: '#8064A2',
    magenta: '#A64D79',
    lime: '#EEFF41',
  },
  text: {
    primary: '#1F232E',
    secondary: '#666666',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
  },
};

export const theme = createTheme({
  palette: {
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    text: brandColors.text,
    background: brandColors.background,
  },
  typography: {
    fontFamily: [
      'Inter', // Recommended font from brand guidelines
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: brandColors.primary.main,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: brandColors.primary.main,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: brandColors.primary.main,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: brandColors.primary.light,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: brandColors.secondary.light,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: brandColors.primary.main,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: brandColors.primary.dark,
          color: '#FFFFFF',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
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
          borderRadius: '4px',
        },
      },
    },
  },
});