import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setOpenSnackbar(true);
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#333",
          marginBottom: 3,
        }}
      >
        Explore Our Products
      </Typography>

      {/* Category Selector */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{
            width: 250,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredItems.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    textAlign: "center",
                    paddingBottom: "16px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {product.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ marginBottom: 2 }}>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: "20px",
                      padding: "10px 0",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #007bff, #0056b3)",
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Item added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
