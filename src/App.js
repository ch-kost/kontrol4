import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import useLocalStorage from './hooks/useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Hooks',
    description: 'Современный подход к управлению состоянием и эффектами в компонентах.',
    status: 'in-progress',
    notes: 'Нужно углубиться в useReducer и кастомные хуки.',
    category: 'Frontend',
    priority: 'high',
    dueDate: '2024-06-10',
  },
  {
    id: 2,
    title: 'Node.js',
    description: 'Настройка сервера и базовая работа с Express.',
    status: 'not-started',
    notes: 'Поднять pet-проект и подключить базу данных.',
    category: 'Backend',
    priority: 'medium',
    dueDate: '2024-06-25',
  },
  {
    id: 3,
    title: 'TypeScript',
    description: 'Добавить типизацию в текущие проекты.',
    status: 'completed',
    notes: 'Нужен рефакторинг утилитарных функций.',
    category: 'Frontend',
    priority: 'low',
    dueDate: '2024-05-30',
  },
];

function App() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #0b132b 100%)', color: '#e5e7eb' }}>
        <Navigation isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<TechnologyList technologies={technologies} setTechnologies={setTechnologies} />} />
            <Route path="/technology/:techId" element={<TechnologyDetail technologies={technologies} setTechnologies={setTechnologies} />} />
            <Route
              path="/dashboard"
              element={(
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard technologies={technologies} />
                </ProtectedRoute>
              )}
            />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;