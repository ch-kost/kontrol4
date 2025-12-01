import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import TechnologyCard from '../components/TechnologyCard';
import TechnologyModal from '../components/TechnologyModal';
import DataImportExport from '../components/DataImportExport';

function TechnologyList({ technologies, setTechnologies }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState({});

  const handleSave = (data) => {
    if (data.id) {
      setTechnologies(prev => prev.map(t => t.id === data.id ? { ...t, ...data } : t));
    } else {
      setTechnologies(prev => [...prev, { ...data, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleUpdateStatus = (id) => {
    setTechnologies(prev => prev.map(t => {
      if (t.id !== id) return t;
      const statuses = ['not-started', 'in-progress', 'completed'];
      const next = statuses[(statuses.indexOf(t.status) + 1) % 3];
      return { ...t, status: next };
    }));
  };

  const handleDelete = (id) => setTechnologies(prev => prev.filter(t => t.id !== id));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Список технологий</Typography>
      <Button variant="contained" onClick={() => { setEditingTech({}); setModalOpen(true); }} sx={{ mb: 2 }}>Добавить</Button>
      <DataImportExport data={technologies} onImport={setTechnologies} />
      <Grid container spacing={2}>
        {technologies.map(tech => (
          <Grid item xs={12} sm={6} md={4} key={tech.id}>
            <TechnologyCard tech={tech} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      <TechnologyModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initialData={editingTech} />
    </Box>
  );
}

export default TechnologyList;