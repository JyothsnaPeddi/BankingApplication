import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  id: "",
};

export const tokenSlice = createSlice({
  name: "tokenLoader",
  initialState,
  reducers: {
    setSavedToken: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
  },
});

export const { setSavedToken } = tokenSlice.actions;

export default tokenSlice.reducer;
