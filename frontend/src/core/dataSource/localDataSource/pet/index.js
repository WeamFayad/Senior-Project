import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const petSliceName = "Pet";

export const petSlice = createSlice({
  name: petSliceName,
  initialState,
  reducers: {
    loadPets: (state, { payload }) => {
      return {
        ...state,
        pets: payload,
      };
    },
    selectPet: (state, { payload }) => {
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

export const { loadPets, cleanData, selectPet } = petSlice.actions;

export default petSlice.reducer;