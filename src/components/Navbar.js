import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Store,
  WbSunny,
  Dashboard,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menuItems = [
    { label: 'Marketplace', path: '/marketplace', icon: <Store /> },
    { label: 'Weather Advisory', path: '/weather-advisory', icon: <WbSunny /> },
  ];

  if (user?.role === 'farmer') {
    menuItems.push({ label: 'Dashboard', path: '/farmer-dashboard', icon: <Dashboard /> });
  } else if (user?.role === 'consumer') {
    menuItems.push({ label: 'Dashboard', path: '/consumer-dashboard', icon: <Dashboard /> });
  }

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate('/')}
        >
          🌱 MkulimaConnect
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    {item.label}
                  </Box>
                </MenuItem>
              ))}
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/register')}>Register</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                startIcon={item.icon}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>
            ))}
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;