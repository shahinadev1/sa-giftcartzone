import { createSlice } from "@reduxjs/toolkit";
const defined = {
  items: [],
  subtotal: 0,
  totalItem: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: defined,
  reducers: {
    add: (state, action) => {
      const isExist = state.items.find((i) => i._id === action.payload._id);
      if (!isExist) {
        const newState = {
          ...state,
          items: [...state.items, { ...action.payload, quintity: 1 }],
          totalAmount: state.totalAmount + parseInt(action.payload.price),
        };
        return newState;
      }
    },
    increment: (state, action) => {
      const updatedCart = state.items.map((curElem) => {
        if (curElem._id === action.payload) {
          return { ...curElem, quintity: curElem.quintity + 1 };
        }
        return curElem;
      });

      return { ...state, items: updatedCart };
    },
    dencrement: (state, action) => {
      const updatedCart = state.items
        .map((curElem) => {
          if (curElem._id === action.payload) {
            return { ...curElem, quintity: curElem.quintity - 1 };
          }
          return curElem;
        })
        .filter((curElem) => curElem.quintity !== 0);

      return { ...state, items: updatedCart };
    },
    get_total: (state, action) => {
      let { totalItem, totalAmount } = state.items.reduce(
        (accum, curVal) => {
          let { price, quintity } = curVal;

          let updatedTotalAmount = price * quintity;
          accum.totalAmount += updatedTotalAmount;

          accum.totalItem += quintity;
          return accum;
        },
        {
          totalItem: 0,
          totalAmount: 0,
        }
      );
      return { ...state, totalItem, totalAmount };
    },
    remove: (state, action) => {
      const restItems = state.items.filter((p) => p._id !== action.payload);
      return { ...state, items: restItems };
    },
  },
});

export const { add, increment, dencrement, get_total, remove } =
  cartSlice.actions;
export default cartSlice.reducer;
