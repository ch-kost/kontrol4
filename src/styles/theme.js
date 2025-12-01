import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#22d3ee' },
    secondary: { main: '#a855f7' },
    success: { main: '#4caf50' },
    warning: { main: '#fb923c' },
    error: { main: '#f87171' },
    background: { default: '#0f172a', paper: '#0b132b' },
  },
  typography: { fontFamily: 'Inter, Roboto, sans-serif' },
  components: {
    MuiCard: { styleOverrides: { root: { transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 700 } } },
  },
});

export default theme;