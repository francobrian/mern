import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  Add,
  Store,
  TrendingUp,
  Inventory,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const FarmerDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Farmer Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {user?.name}! Manage your farm and track your sales.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Store color="primary" />
                <Box>
                  <Typography variant="h4" component="div">
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp color="success" />
                <Box>
                  <Typography variant="h4" component="div">
                    KES 24,500
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Inventory color="info" />
                <Box>
                  <Typography variant="h4" component="div">
                    8
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Products
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" component="div" color="primary">
                  4.8
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Rating
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your recent orders and activities will appear here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" startIcon={<Add />} fullWidth>
                  Add New Product
                </Button>
                <Button variant="outlined" startIcon={<Store />} fullWidth>
                  View My Products
                </Button>
                <Button variant="outlined" startIcon={<Inventory />} fullWidth>
                  Manage Inventory
                </Button>
                <Button variant="outlined" startIcon={<TrendingUp />} fullWidth>
                  View Analytics
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FarmerDashboard;