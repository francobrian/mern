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
  ShoppingCart,
  History,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const ConsumerDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Consumer Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {user?.name}! Track your orders and manage your account.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ShoppingCart color="primary" />
                <Box>
                  <Typography variant="h4" component="div">
                    5
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
                <History color="success" />
                <Box>
                  <Typography variant="h4" component="div">
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
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
                <ShoppingCart color="info" />
                <Box>
                  <Typography variant="h4" component="div">
                    2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
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
                  KES 8,750
                </Typography>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your recent orders will appear here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Person color="primary" />
                <Typography variant="h6">
                  Profile Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">
                    {user?.name}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {user?.email}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1">
                    {user?.role}
                  </Typography>
                </Box>
              </Box>
              
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConsumerDashboard;