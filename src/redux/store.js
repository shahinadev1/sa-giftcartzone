import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartReducer";
import firebaseReducer from "./reducer/firebaseReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore(
  {
    reducer: {
      cartReducer,
      firebaseReducer,
    },
  },
  composeWithDevTools()
);

export default store;
