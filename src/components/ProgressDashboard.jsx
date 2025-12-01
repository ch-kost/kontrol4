import React from 'react';
import { Box, Typography, LinearProgress, Tabs, Tab, List, ListItem, ListItemText, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import { TrendingUp, Speed, TaskAlt } from '@mui/icons-material';

function ProgressDashboard({ technologies }) {
  const [tab, setTab] = React.useState(0);
  const completed = technologies.filter((t) => t.status === 'completed').length;
  const inProgress = technologies.filter((t) => t.status === 'in-progress').length;
  const notStarted = technologies.filter((t) => t.status === 'not-started').length;
  const progress = (completed / technologies.length) * 100 || 0;

  const priorities = technologies.reduce((acc, tech) => {
    acc[tech.priority || 'unknown'] = (acc[tech.priority || 'unknown'] || 0) + 1;
    return acc;
  }, {});

  const summaryCards = [
    { title: 'Прогресс', value: `${progress.toFixed(0)}%`, icon: <TrendingUp color="success" />, subtitle: `${completed} завершено` },
    { title: 'В работе', value: inProgress, icon: <Speed color="warning" />, subtitle: 'Активные изучения' },
    { title: 'Очередь', value: notStarted, icon: <TaskAlt color="error" />, subtitle: 'Ожидают старта' },
  ];

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered textColor="inherit">
        <Tab label="Обзор" />
        <Tab label="Статистика" />
        <Tab label="Активность" />
      </Tabs>
      {tab === 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {summaryCards.map((card) => (
            <Grid item xs={12} md={4} key={card.title}>
              <Card sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {card.icon}
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">{card.title}</Typography>
                      <Typography variant="h5">{card.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{card.subtitle}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Общий прогресс: {progress.toFixed(0)}%</Typography>
            <LinearProgress variant="determinate" value={progress} color="success" sx={{ height: 10, borderRadius: 999 }} />
          </Grid>
        </Grid>
      )}
      {tab === 1 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>Распределение статусов</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label={`Завершено: ${completed}`} color="success" />
                  <Chip label={`В процессе: ${inProgress}`} color="warning" />
                  <Chip label={`Не начато: ${notStarted}`} color="error" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>По приоритетам</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {Object.entries(priorities).map(([level, count]) => (
                    <Chip key={level} label={`${level.toUpperCase()}: ${count}`} variant="outlined" color={level === 'high' ? 'error' : level === 'medium' ? 'warning' : 'info'} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {tab === 2 && (
        <List sx={{ mt: 2 }}>
          {technologies.map((tech) => (
            <ListItem key={tech.id} divider>
              <ListItemText primary={tech.title} secondary={`${tech.category || 'Категория не указана'} • статус: ${tech.status}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default ProgressDashboard;
