export const add_to_cart = (payload) => {
  return {
    type: "ADD_TO_CART",
    payload,
  };
};

export const remove_form_cart = (payload) => {
  return {
    type: "REMOVE_FORM_CART",
    payload,
  };
};
