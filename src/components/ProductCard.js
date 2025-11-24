import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { user } = useAuth();

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/default-product.jpg'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, flexGrow: 1 }}>
          {product.description || 'Fresh farm produce'}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={product.category} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
          {product.isOrganic && (
            <Chip 
              label="Organic" 
              size="small" 
              color="success" 
              sx={{ ml: 0.5 }}
            />
          )}
        </Box>

        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          {formatCurrency(product.price)} / {product.unit}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Available: {product.quantity} {product.unit}
        </Typography>

        {user && user.role === 'consumer' && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            sx={{ mt: 'auto' }}
          >
            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;