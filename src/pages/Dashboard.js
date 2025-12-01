import React from 'react';
import { Box, Typography } from '@mui/material';
import ProgressDashboard from '../components/ProgressDashboard';

function Dashboard({ technologies }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Дашборд</Typography>
      <ProgressDashboard technologies={technologies} />
    </Box>
  );
}

export default Dashboard;