import React from 'react';
import { Button, Box, Alert } from '@mui/material';

function DataImportExport({ data, onImport }) {
  const handleExport = () => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technologies.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) throw new Error('Неверный формат');
        onImport(imported);
      } catch (err) {
        alert('Ошибка: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="outlined" onClick={handleExport}>Экспорт JSON</Button>
      <Button variant="outlined" component="label" sx={{ ml: 2 }}>
        Импорт JSON
        <input type="file" hidden onChange={handleImport} accept=".json" />
      </Button>
    </Box>
  );
}

export default DataImportExport;