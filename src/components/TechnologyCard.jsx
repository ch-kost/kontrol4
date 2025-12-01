import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box, Stack, Tooltip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, HourglassEmpty, PlayArrow, Edit, Delete, Visibility } from '@mui/icons-material';

const statusConfig = {
  'not-started': { icon: <HourglassEmpty fontSize="small" />, label: 'Не начато', color: 'error' },
  'in-progress': { icon: <PlayArrow fontSize="small" />, label: 'В процессе', color: 'warning' },
  completed: { icon: <CheckCircle fontSize="small" />, label: 'Завершено', color: 'success' },
};

const priorityColor = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

function TechnologyCard({ tech, onUpdateStatus, onDelete, onEdit }) {
  const navigate = useNavigate();
  const status = statusConfig[tech.status] || statusConfig['not-started'];

  return (
    <Card sx={{ mb: 2, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#e2e8f0' }}>{tech.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{tech.description}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Chip icon={status.icon} label={status.label} color={status.color} size="small" />
              <Chip label={tech.category || 'Без категории'} variant="outlined" color="secondary" size="small" />
              <Chip label={`Приоритет: ${tech.priority || 'n/a'}`} color={priorityColor[tech.priority] || 'default'} size="small" />
              {tech.dueDate && <Chip label={`Дедлайн: ${tech.dueDate}`} variant="outlined" size="small" />}
            </Stack>
          </Box>
          <Chip label={`ID: ${tech.id}`} variant="outlined" size="small" />
        </Box>

        {tech.notes && (
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(226,232,240,0.8)' }}>
            {tech.notes}
          </Typography>
        )}

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button size="small" variant="outlined" startIcon={<Visibility />} onClick={() => navigate(`/technology/${tech.id}`)}>
            Подробнее
          </Button>
          <Button size="small" variant="outlined" color="secondary" startIcon={<Edit />} onClick={() => onEdit(tech)}>
            Редактировать
          </Button>
          <Tooltip title="Циклически меняет статус (Не начато → В процессе → Завершено)">
            <Button size="small" variant="contained" onClick={() => onUpdateStatus(tech.id)}>
              Обновить статус
            </Button>
          </Tooltip>
          <Button size="small" variant="outlined" color="error" startIcon={<Delete />} onClick={() => onDelete(tech.id)}>
            Удалить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TechnologyCard;
