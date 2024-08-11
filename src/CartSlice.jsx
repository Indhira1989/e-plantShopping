import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const plant = action.payload;
        // Check if the item already exists in the cart
        const existingItem = state.items.find(item => item.name === plant.name);
  
        if (existingItem) {
          // If the item exists, you may choose to update its quantity or other properties
          // For example, you might increment quantity if you have a quantity field
        } else {
          // If the item does not exist, add it to the items array
          state.items.push(plant);
        }
      },
    removeItem: (state, action) => {
        const plantName = action.payload;
        // Filter out the item with the given name
        state.items = state.items.filter(item => item.name !== plantName);
      },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        // Find the item and update its quantity
        const item = state.items.find(item => item.name === name);
        if (item) {
          item.quantity = quantity; // Assuming you have a quantity field in your plant object
        }
      },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
