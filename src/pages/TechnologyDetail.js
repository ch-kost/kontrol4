import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Chip, Stack, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const statusLabels = {
  'not-started': { label: 'Не начато', color: 'error' },
  'in-progress': { label: 'В процессе', color: 'warning' },
  completed: { label: 'Завершено', color: 'success' },
};

function TechnologyDetail({ technologies }) {
  const { techId } = useParams();
  const navigate = useNavigate();
  const tech = technologies.find((t) => t.id === Number(techId));

  if (!tech) return <Typography>Не найдено</Typography>;

  const status = statusLabels[tech.status] || statusLabels['not-started'];

  return (
    <Box sx={{ p: 2 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Назад
      </Button>
      <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Chip label={status.label} color={status.color} />
          <Chip label={tech.category || 'Без категории'} variant="outlined" />
          <Chip label={`Приоритет: ${tech.priority}`} color={tech.priority === 'high' ? 'error' : tech.priority === 'medium' ? 'warning' : 'info'} />
          {tech.dueDate && <Chip label={`Дедлайн: ${tech.dueDate}`} variant="outlined" />}
        </Stack>
        <Typography variant="h4" gutterBottom>
          {tech.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(229,231,235,0.9)' }}>
          {tech.description}
        </Typography>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Typography variant="subtitle1" gutterBottom>
          Заметки
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tech.notes || 'Пока нет заметок'}
        </Typography>
      </Paper>
    </Box>
  );
}

export default TechnologyDetail;
