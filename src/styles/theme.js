import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
  components: {
    MuiCard: { styleOverrides: { root: { transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } } } },
  },
});

export default theme;