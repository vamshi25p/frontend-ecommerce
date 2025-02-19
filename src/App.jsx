import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Billing from "./pages/Billing"; // ✅ Import Billing Page
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Badge,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";

function App() {
  const cartItems = useSelector((state) => state.cart.items) || [];

  return (
    <div>
      {/* Material UI Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: "#0A192F", // Dark navy blue for high contrast
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          padding: "8px 0",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 45,
              marginRight: 15,
              borderRadius: "50%",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.4)",
            }}
          />

          {/* Stylish App Name */}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer",
              background: "linear-gradient(45deg, #32CD32, #00E5FF, #FFEB3B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Bungee Shade', cursive",
              textShadow: "3px 3px 15px rgba(50, 205, 50, 0.8)",
            }}
            component={Link}
            to="/"
            style={{ textDecoration: "none" }}
          >
            ShopNest
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              transition: "0.3s",
              "&:hover": { color: "#FFEB3B" },
            }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/cart"
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              transition: "0.3s",
              "&:hover": { color: "#FFEB3B" },
            }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCart />
            </Badge>
            &nbsp; Cart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container
        sx={{
          marginTop: 4,
          padding: 3,
          bgcolor: "#E3F2FD",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />{" "}
          {/* ✅ Added Billing Route */}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
