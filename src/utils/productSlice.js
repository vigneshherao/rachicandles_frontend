import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.productsList = action.payload;
    },
  },
});

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
