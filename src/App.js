import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import WeatherAdvisory from './pages/WeatherAdvisory';

// Components
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
    },
    secondary: {
      main: '#FF9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
              <Route path="/weather-advisory" element={<WeatherAdvisory />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;