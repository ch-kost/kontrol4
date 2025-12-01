import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

function TechnologyDetail({ technologies, setTechnologies }) {
  const { techId } = useParams();
  const navigate = useNavigate();
  const tech = technologies.find(t => t.id === Number(techId));

  if (!tech) return <Typography>Не найдено</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">{tech.title}</Typography>
        <Typography>{tech.description}</Typography>
        <Typography>Статус: {tech.status}</Typography>
        <Typography>Заметки: {tech.notes}</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>Назад</Button>
      </Paper>
    </Box>
  );
}

export default TechnologyDetail;