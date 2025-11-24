import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { Thermostat, Opacity, Air, Grass } from '@mui/icons-material';
import axios from 'axios';

const WeatherAdvisory = () => {
  const [weather, setWeather] = useState(null);
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, get user's location
    const userLocation = { lat: -1.2921, lon: 36.8219 }; // Nairobi coordinates
    
    fetchWeatherData(userLocation);
    fetchAdvisory('vegetables', userLocation);
  }, []);

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(
        `/api/weather/${location.lat}/${location.lon}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const fetchAdvisory = async (cropType, location) => {
    try {
      const response = await axios.get(
        `/api/weather/advisory/${cropType}/${location.lat},${location.lon}`
      );
      setAdvisory(response.data);
    } catch (error) {
      console.error('Error fetching advisory:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather & Crop Advisory
      </Typography>

      <Grid container spacing={3}>
        {/* Current Weather */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Weather
              </Typography>
              {weather && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Thermostat color="primary" />
                    <Typography>Temperature: {weather.temperature}°C</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Opacity color="primary" />
                    <Typography>Humidity: {weather.humidity}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Air color="primary" />
                    <Typography>Wind Speed: {weather.windSpeed} m/s</Typography>
                  </Box>
                  <Typography>
                    Conditions: {weather.description}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Crop Advisory */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Crop Advisory
              </Typography>
              {advisory && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Alert severity="info">
                    <Typography variant="subtitle2">Planting</Typography>
                    <Typography variant="body2">{advisory.planting}</Typography>
                  </Alert>
                  <Alert severity="success">
                    <Typography variant="subtitle2">Irrigation</Typography>
                    <Typography variant="body2">{advisory.irrigation}</Typography>
                  </Alert>
                  <Alert severity="warning">
                    <Typography variant="subtitle2">Pest Control</Typography>
                    <Typography variant="body2">{advisory.pestControl}</Typography>
                  </Alert>
                  <Alert severity="info">
                    <Typography variant="subtitle2">Harvest</Typography>
                    <Typography variant="body2">{advisory.harvest}</Typography>
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Climate Smart Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Climate Smart Recommendations
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Grass color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Drought Resistant Crops
                    </Typography>
                    <Typography variant="body2">
                      Consider sorghum, millet, or drought-resistant maize varieties
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Opacity color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Water Conservation
                    </Typography>
                    <Typography variant="body2">
                      Implement drip irrigation and rainwater harvesting
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Thermostat color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Soil Management
                    </Typography>
                    <Typography variant="body2">
                      Use organic mulch to retain soil moisture
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Air color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Crop Rotation
                    </Typography>
                    <Typography variant="body2">
                      Rotate legumes with cereals to improve soil health
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherAdvisory;