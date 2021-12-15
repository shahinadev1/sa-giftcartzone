import { createSlice } from "@reduxjs/toolkit";
const initState = {
  isAdmin: {},
  user: {},
};
const firebaseReducer = createSlice({
  name: "firebase",
  initialState: initState,
  reducers: {
    updateAdmin: (state, action) => {
      return { ...state, isAdmin: action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { updateAdmin, updateUser } = firebaseReducer.actions;

export default firebaseReducer.reducer;
