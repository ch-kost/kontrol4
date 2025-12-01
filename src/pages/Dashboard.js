import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import ProgressDashboard from '../components/ProgressDashboard';

function Dashboard({ technologies }) {
  const completed = technologies.filter((t) => t.status === 'completed').length;
  const total = technologies.length || 1;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)', color: '#0f172a' }}>
        <Typography variant="h4" gutterBottom>Дашборд обучения</Typography>
        <Typography variant="body1">
          Следите за прогрессом по всем направлениям и находите узкие места в вашем плане развития.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip label={`Тем в бэклоге: ${technologies.length}`} color="primary" />
          <Chip label={`Завершено: ${completed}`} color="success" />
          <Chip label={`Процент выполнено: ${Math.round((completed / total) * 100)}%`} color="secondary" />
        </Stack>
      </Paper>
      <ProgressDashboard technologies={technologies} />
    </Box>
  );
}

export default Dashboard;
