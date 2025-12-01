import React from 'react';
import { Box, Typography, LinearProgress, Tabs, Tab, List, ListItem, ListItemText, Grid } from '@mui/material';

function ProgressDashboard({ technologies }) {
  const [tab, setTab] = React.useState(0);
  const completed = technologies.filter(t => t.status === 'completed').length;
  const progress = (completed / technologies.length) * 100 || 0;

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Обзор" />
        <Tab label="Статистика" />
        <Tab label="Активность" />
      </Tabs>
      {tab === 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography>Прогресс: {progress.toFixed(0)}%</Typography>
            <LinearProgress variant="determinate" value={progress} color="success" />
          </Grid>
        </Grid>
      )}
      {tab === 1 && (
        <Typography sx={{ mt: 2 }}>Завершено: {completed} / {technologies.length}</Typography>
      )}
      {tab === 2 && (
        <List sx={{ mt: 2 }}>
          {technologies.map(tech => <ListItem key={tech.id}><ListItemText primary={`${tech.title} - ${tech.status}`} /></ListItem>)}
        </List>
      )}
    </Box>
  );
}

export default ProgressDashboard;