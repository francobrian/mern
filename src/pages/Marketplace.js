import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Snackbar,
} from '@mui/material';
import { productsAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // useCallback to memoize the fetchProducts function
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        page,
        limit: 12,
        category: category || undefined,
        search: searchTerm || undefined,
      };

      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
      setSnackbar({
        open: true,
        message: 'Failed to load products',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [page, category, searchTerm]); // Include all dependencies used in the function

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Now fetchProducts is properly included as a dependency

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      fetchProducts();
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset to first page when category changes
  };

  const handleAddToCart = (product) => {
    // For now, just show a success message
    // You can implement cart functionality later
    setSnackbar({
      open: true,
      message: `Added ${product.name} to cart!`,
      severity: 'success'
    });
    console.log('Added to cart:', product);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Marketplace
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover fresh produce directly from local farmers
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Search products..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleSearchSubmit}
          sx={{ minWidth: 200 }}
          size="small"
        />
        
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="vegetables">Vegetables</MenuItem>
            <MenuItem value="fruits">Fruits</MenuItem>
            <MenuItem value="grains">Grains</MenuItem>
            <MenuItem value="dairy">Dairy</MenuItem>
            <MenuItem value="poultry">Poultry</MenuItem>
            <MenuItem value="herbs">Herbs</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />
        
        <Typography variant="body2" color="text.secondary">
          Page {page} of {totalPages}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              </Grid>
            ))}
          </Grid>

          {products.length === 0 && !loading && (
            <Typography variant="h6" textAlign="center" sx={{ mt: 4, color: 'text.secondary' }}>
              No products found matching your criteria
            </Typography>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Marketplace;