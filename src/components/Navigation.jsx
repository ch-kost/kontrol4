import React from 'react';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box, Chip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Insights, ListAlt } from '@mui/icons-material';

function Navigation({ isAuthenticated, onLogin }) {
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: 'blur(8px)', background: 'rgba(15, 23, 42, 0.85)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Трекер технологий</Typography>
          <Chip label="beta" size="small" color="secondary" />
        </Box>
        <Tabs value={location.pathname} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: '#22d3ee' } }}>
          <Tab icon={<ListAlt />} iconPosition="start" label="Список" value="/" component={Link} to="/" />
          <Tab icon={<Insights />} iconPosition="start" label="Дашборд" value="/dashboard" component={Link} to="/dashboard" disabled={!isAuthenticated} />
        </Tabs>
        {!isAuthenticated && (
          <Button color="secondary" variant="contained" onClick={onLogin} sx={{ ml: 2, textTransform: 'none', fontWeight: 700 }}>
            Войти как гость
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
