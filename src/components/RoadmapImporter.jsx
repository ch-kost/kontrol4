import React, { useState } from 'react';
import { Button, CircularProgress, Alert, Box } from '@mui/material';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function RoadmapImporter({ onImport }) {
  const { addTechnology, loading, error } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    setImporting(true);
    // Mock import from API
    const mockRoadmap = [
      { id: Date.now(), title: 'React Hooks', description: 'Advanced hooks', status: 'not-started' },
      { id: Date.now() + 1, title: 'Node.js', description: 'Backend basics', status: 'not-started' }
    ];
    for (const tech of mockRoadmap) {
      await addTechnology(tech);
    }
    onImport(mockRoadmap);
    setImporting(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleImport} disabled={importing}>Импортировать дорожную карту</Button>
      {importing && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}

export default RoadmapImporter;