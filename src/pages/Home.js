import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  LocalFlorist,
  Store,
  WbSunny,
  Spa,           // Using Spa instead of Eco
  Group,
  Speed,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Store sx={{ fontSize: 40 }} />,
      title: 'Direct Marketplace',
      description: 'Connect directly with local farmers and buy fresh produce at fair prices.',
    },
    {
      icon: <WbSunny sx={{ fontSize: 40 }} />,
      title: 'Weather Advisory',
      description: 'Get real-time weather data and crop-specific farming advice.',
    },
    {
      icon: <Spa sx={{ fontSize: 40 }} />,
      title: 'Climate Smart',
      description: 'Climate-resilient farming practices and sustainable agriculture.',
    },
    {
      icon: <Group sx={{ fontSize: 40 }} />,
      title: 'Community Driven',
      description: 'Build a sustainable local food ecosystem with your community.',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Farm Analytics',
      description: 'Data-driven insights for better farming decisions and higher yields.',
    },
    {
      icon: <LocalFlorist sx={{ fontSize: 40 }} />,
      title: 'Fresh & Organic',
      description: 'Access fresh, organic produce directly from trusted local farmers.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            🌱 MkulimaConnect
          </Typography>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Connecting Local Farmers Directly with Consumers
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mb: 4, maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}
          >
            Building climate-resilient food systems while supporting SDG 2: Zero Hunger 
            and SDG 13: Climate Action.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/marketplace')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
                px: 4,
                py: 1.5,
              }}
            >
              Browse Marketplace
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  px: 4,
                  py: 1.5,
                }}
              >
                Join as Farmer
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose MkulimaConnect?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4,
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Join Our Farming Revolution?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Whether you're a farmer or a consumer, be part of the sustainable food movement.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ px: 4, py: 1.5 }}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/marketplace')}
              sx={{ px: 4, py: 1.5 }}
            >
              Explore Products
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;