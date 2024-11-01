import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../utils/productSlice";

const appStore = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default appStore;
