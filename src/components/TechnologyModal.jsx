import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Stack } from '@mui/material';

const defaultForm = {
  title: '',
  description: '',
  status: 'not-started',
  notes: '',
  category: 'Frontend',
  priority: 'medium',
  dueDate: '',
};

function TechnologyModal({ open, onClose, onSave, initialData = {} }) {
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({ ...defaultForm, ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.length < 3 && ['title', 'description'].includes(name) ? 'Минимум 3 символа' : '',
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || errors.title) return;
    onSave(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', m: 'auto', maxWidth: 640, mt: '6%', borderRadius: 3, boxShadow: 24 }}>
        <Typography variant="h6" gutterBottom>
          {formData.id ? 'Редактирование технологии' : 'Добавить новую технологию'}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Название"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
          />
          <TextField
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            minRows={2}
          />
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select name="status" value={formData.status} label="Статус" onChange={handleChange}>
              <MenuItem value="not-started">Не начато</MenuItem>
              <MenuItem value="in-progress">В процессе</MenuItem>
              <MenuItem value="completed">Завершено</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select name="category" value={formData.category} label="Категория" onChange={handleChange}>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="DevOps">DevOps</MenuItem>
              <MenuItem value="Другое">Другое</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Приоритет</InputLabel>
            <Select name="priority" value={formData.priority} label="Приоритет" onChange={handleChange}>
              <MenuItem value="high">Высокий</MenuItem>
              <MenuItem value="medium">Средний</MenuItem>
              <MenuItem value="low">Низкий</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Дедлайн"
            name="dueDate"
            type="date"
            value={formData.dueDate || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Заметки"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="text" onClick={onClose}>Отмена</Button>
            <Button variant="contained" onClick={handleSubmit}>Сохранить</Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}

export default TechnologyModal;