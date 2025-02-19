import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Ensure it's an array
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
        const itemId = action.payload;
        const existingItem = state.items.find((item) => item.id === itemId);
  
        if (existingItem) {
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1; // Decrement quantity
          } else {
            state.items = state.items.filter((item) => item.id !== itemId); // Remove when quantity is 0
          }
        }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
