import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Paper,
} from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items) || []; // Ensure cartItems is always an array

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ padding: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" color="#333" gutterBottom>
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 5, fontSize: "18px" }}>
          No items in your cart. Start shopping now!
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {product.title}
                    </Typography>
                    <Typography color="text.secondary">
                      Price: <strong>${product.price}</strong>
                    </Typography>
                    <Typography color="text.secondary">
                      Quantity: <strong>{product.quantity}</strong>
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Order Summary Section */}
          <Paper
            sx={{
              marginTop: 4,
              padding: 3,
              textAlign: "center",
              bgcolor: "#fff",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="#333">
              Order Summary
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={cartItems.length === 0}
              onClick={() => navigate("/billing")}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Cart;
