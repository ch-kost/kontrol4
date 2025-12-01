import React, { useMemo, useState } from 'react';
import { Box, Button, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Chip, Paper } from '@mui/material';
import { Add, FilterAlt } from '@mui/icons-material';
import TechnologyCard from '../components/TechnologyCard';
import TechnologyModal from '../components/TechnologyModal';
import DataImportExport from '../components/DataImportExport';
import RoadmapImporter from '../components/RoadmapImporter';

function TechnologyList({ technologies, setTechnologies }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const handleSave = (data) => {
    if (data.id) {
      setTechnologies((prev) => prev.map((t) => (t.id === data.id ? { ...t, ...data } : t)));
    } else {
      setTechnologies((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleUpdateStatus = (id) => {
    setTechnologies((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const statuses = ['not-started', 'in-progress', 'completed'];
        const next = statuses[(statuses.indexOf(t.status) + 1) % 3];
        return { ...t, status: next };
      }),
    );
  };

  const handleDelete = (id) => setTechnologies((prev) => prev.filter((t) => t.id !== id));

  const filteredTechnologies = useMemo(() => {
    let result = technologies.filter((tech) => tech.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== 'all') result = result.filter((tech) => tech.status === statusFilter);
    if (categoryFilter !== 'all') result = result.filter((tech) => tech.category === categoryFilter);
    if (sortBy === 'priority') {
      const weight = { high: 0, medium: 1, low: 2 };
      result = [...result].sort((a, b) => (weight[a.priority] ?? 3) - (weight[b.priority] ?? 3));
    }
    if (sortBy === 'date') {
      result = [...result].sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
    }
    return result;
  }, [technologies, search, statusFilter, categoryFilter, sortBy]);

  const statusCounts = useMemo(
    () => ({
      completed: technologies.filter((t) => t.status === 'completed').length,
      progress: technologies.filter((t) => t.status === 'in-progress').length,
      idle: technologies.filter((t) => t.status === 'not-started').length,
    }),
    [technologies],
  );

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg,#1f2937 0%,#111827 100%)', color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Typography variant="h4" gutterBottom>Технологический бэклог</Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'rgba(229,231,235,0.8)' }}>
          Организуйте задачи по изучению технологий, отмечайте прогресс и собирайте личный роадмап.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingTech({}); setModalOpen(true); }}>
            Добавить технологию
          </Button>
          <DataImportExport data={technologies} onImport={setTechnologies} />
          <RoadmapImporter onImport={(items) => setTechnologies((prev) => [...prev, ...items])} />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip label={`Завершено: ${statusCounts.completed}`} color="success" />
          <Chip label={`В процессе: ${statusCounts.progress}`} color="warning" />
          <Chip label={`Не начато: ${statusCounts.idle}`} color="error" />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField label="Поиск" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select value={statusFilter} label="Статус" onChange={(e) => setStatusFilter(e.target.value)} startAdornment={<FilterAlt fontSize="small" />}>
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="not-started">Не начато</MenuItem>
              <MenuItem value="in-progress">В процессе</MenuItem>
              <MenuItem value="completed">Завершено</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select value={categoryFilter} label="Категория" onChange={(e) => setCategoryFilter(e.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="DevOps">DevOps</MenuItem>
              <MenuItem value="Другое">Другое</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Сортировка</InputLabel>
            <Select value={sortBy} label="Сортировка" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="priority">По приоритету</MenuItem>
              <MenuItem value="date">По дедлайну</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        {filteredTechnologies.map((tech) => (
          <Grid item xs={12} sm={6} md={4} key={tech.id}>
            <TechnologyCard
              tech={tech}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
              onEdit={(item) => { setEditingTech(item); setModalOpen(true); }}
            />
          </Grid>
        ))}
      </Grid>

      {!filteredTechnologies.length && (
        <Paper sx={{ p: 3, mt: 2, textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Typography variant="h6">Ничего не найдено</Typography>
          <Typography variant="body2" color="text.secondary">
            Попробуйте изменить фильтры или добавьте новую технологию.
          </Typography>
        </Paper>
      )}

      <TechnologyModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initialData={editingTech} />
    </Box>
  );
}

export default TechnologyList;
