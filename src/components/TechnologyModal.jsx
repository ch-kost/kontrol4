import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

function TechnologyModal({ open, onClose, onSave, initialData = {} }) {
  const [formData, setFormData] = useState({ title: '', description: '', status: 'not-started', notes: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => setFormData(initialData), [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value.length < 3 ? 'Минимум 3 символа' : '' }));
  };

  const handleSubmit = () => {
    if (!errors.title && formData.title) onSave(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', m: 'auto', maxWidth: 500, mt: '10%', borderRadius: 2 }}>
        <Typography variant="h6">Добавить/Редактировать</Typography>
        <TextField label="Название" name="title" value={formData.title} onChange={handleChange} error={!!errors.title} helperText={errors.title} fullWidth sx={{ mt: 2 }} />
        <TextField label="Описание" name="description" value={formData.description} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Статус</InputLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <MenuItem value="not-started">Не начато</MenuItem>
            <MenuItem value="in-progress">В процессе</MenuItem>
            <MenuItem value="completed">Завершено</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Заметки" name="notes" value={formData.notes} onChange={handleChange} fullWidth multiline sx={{ mt: 2 }} />
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Сохранить</Button>
      </Box>
    </Modal>
  );
}

export default TechnologyModal;