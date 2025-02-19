import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";

const Billing = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items) || [];
  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on page load
  }, []);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Billing details state
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  const handleChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully! ✅");
    navigate("/"); // Redirect to Home after placing the order
  };

  return (
    <Box sx={{ padding: 3, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", boxShadow: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Billing Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={billingDetails.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Address"
            name="address"
            value={billingDetails.address}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={3}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Payment Method"
            name="paymentMethod"
            value={billingDetails.paymentMethod}
            onChange={handleChange}
            fullWidth
            select
            sx={{ marginBottom: 3 }}
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="Bitcoin">Bitcoin</MenuItem>
          </TextField>

          <Typography variant="h6" fontWeight="bold">
            Total Amount: ${totalAmount.toFixed(2)}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Place Order
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Billing;
