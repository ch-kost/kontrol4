import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Dashboard from './pages/Dashboard';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation isAuthenticated={isAuthenticated} onLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<TechnologyList technologies={technologies} setTechnologies={setTechnologies} />} />
        <Route path="/technology/:techId" element={<TechnologyDetail technologies={technologies} setTechnologies={setTechnologies} />} />
        <Route path="/dashboard" element={<Dashboard technologies={technologies} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;