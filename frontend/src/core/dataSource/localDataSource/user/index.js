import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  user_id: "",
  name: "",
  address: "",
  phone: "",
  userType: "",
  chatSessions: [],
  cart: {},
  image: "",
  token: "",
};

export const userSliceName = "User";

export const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    loggedIn: (state, { payload }) => {
      const {
        email,
        user_id,
        name,
        address,
        phone,
        userType,
        chatSessions,
        cart,
        image,
        token,
      } = payload;

      return {
        email,
        user_id,
        name,
        address,
        phone,
        userType,
        chatSessions,
        cart,
        image,
        token,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
    updateCart: (state, { payload }) => {
      const { cart } = payload;
      return { ...state, cart };
    },
  },
});

export const { loggedIn, cleanData } = userSlice.actions;

export default userSlice.reducer;
