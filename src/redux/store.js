import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore(
  {
    reducer: {
      cartReducer,
    },
  },
  composeWithDevTools()
);

export default store;
