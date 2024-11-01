import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    isAdmin: false,
  },
  reducers: {
    addProducts: (state, action) => {
      state.productsList = action.payload;
    },
    setAdmin(state) {
      state.isAdmin = true;
    },
  },
});

export const { addProducts, setAdmin } = productSlice.actions;

export default productSlice.reducer;
