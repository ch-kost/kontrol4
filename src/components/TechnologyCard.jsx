import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, HourglassEmpty, PlayArrow } from '@mui/icons-material';

function TechnologyCard({ tech, onUpdateStatus, onDelete }) {
  const navigate = useNavigate();
  const statusIcons = {
    'not-started': <HourglassEmpty color="error" />,
    'in-progress': <PlayArrow color="warning" />,
    'completed': <CheckCircle color="success" />,
  };
  const statusColors = { 'not-started': 'error', 'in-progress': 'warning', 'completed': 'success' };

  return (
    <Card sx={{ mb: 2 }} onClick={() => navigate(`/technology/${tech.id}`)}>
      <CardContent>
        <Typography variant="h6">{tech.title}</Typography>
        <Typography variant="body2" color="text.secondary">{tech.description}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {statusIcons[tech.status]}
          <Chip label={tech.status} color={statusColors[tech.status]} sx={{ ml: 1 }} />
        </Box>
        <Button onClick={(e) => { e.stopPropagation(); onUpdateStatus(tech.id); }} sx={{ mt: 1 }}>Изменить статус</Button>
        <Button onClick={(e) => { e.stopPropagation(); onDelete(tech.id); }} color="error" sx={{ mt: 1, ml: 1 }}>Удалить</Button>
      </CardContent>
    </Card>
  );
}

export default TechnologyCard;