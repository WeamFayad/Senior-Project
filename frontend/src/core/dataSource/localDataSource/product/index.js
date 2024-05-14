import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productSliceName = "Product";

export const productSlice = createSlice({
  name: productSliceName,
  initialState,
  reducers: {
    loadProducts: (state, { payload }) => {
      return {
        ...state,
        products: payload,
      };
    },
    selectProduct: (state, { payload }) => {
      return {
        ...state,
        curerntSelected: payload,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loadProducts, cleanData, selectProduct } = productSlice.actions;

export default productSlice.reducer;
