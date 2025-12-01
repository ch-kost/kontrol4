import React from 'react';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ isAuthenticated, onLogin }) {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Трекер Технологий</Typography>
        <Tabs value={location.pathname} textColor="inherit">
          <Tab label="Список" value="/" component={Link} to="/" />
          <Tab label="Дашборд" value="/dashboard" component={Link} to="/dashboard" disabled={!isAuthenticated} />
        </Tabs>
        {!isAuthenticated && <Button color="inherit" onClick={onLogin}>Войти</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;