import { stat } from "fs";

const ProductsReducer = (
  state = {
    products: [],
    currentProduct: {},
    cart: [],
    cartSaved: true,
    addSuccessMessage: ""
  },
  action
) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_SUCCESS":
      return Object.assign({}, state, {
        products: action.data
      });
    case "FETCH_PRODUCTDETAILS_SUCCESS":
      return Object.assign({}, state, {
        currentProduct: action.data
      });
    case "ADD_TO_LOCAL_CART":
      var data = Object.assign({}, state, {});
      var index = data.cart.findIndex(x => x._id == action.data._id);
      if (index >= 0) {
        data.cart[index].price = action.data.price;
        data.cart[index].quantity += action.data.quantity;
      } else {
        data.cart.push(action.data);
      }
      data.addSuccessMessage = "Item added to cart successfully!";
      return data;
    case "ADD_TO_CART_SUCCESS":
      return Object.assign({}, state, {
        cart: action.data.cart,
        addSuccessMessage: "Item added to cart successfully!"
      });
    case "LOGOUT":
      return Object.assign({}, state, {
        cart: []
      });
    case "LOGIN_SUCCESS":
      var data = Object.assign({}, state, {});
      if (data.cart.length > 0) {
        //merge local and global carts
        action.data.cart.forEach(item => {
          let index = data.cart.findIndex(x => x._id == item._id);
          if (index >= 0) {
            let globalQuantity = Number(item.quantity);
            data.cart[index].quantity += globalQuantity;
          } else {
            data.cart.push(item);
          }
        });
        data.cartSaved = false;
      } else {
        data.cart = action.data.cart;
      }
      return data;
    case "SAVE_CART_SUCCESS":
      return Object.assign({}, state, { cartSaved: true });
    case "REMOVE_LOCAL_ITEM":
      var data = Object.assign({}, state, {});
      var index = data.cart.findIndex(x => x._id == action.data._id);
      data.cart.splice(index, 1);
      return data;
    case "REMOVE_ITEM_SUCCESS":
      var data = Object.assign({}, state, { cart: action.data.cart });
      return data;
    case "CLEAR_PRODUCT_MESSAGES":
      return Object.assign({}, state, { addSuccessMessage: "" });
    default:
      return state;
  }
};

export default ProductsReducer;
