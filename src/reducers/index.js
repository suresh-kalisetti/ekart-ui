import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ProductsReducer from "./ProductsReducer";

var reducer = combineReducers({
  UserReducer,
  ProductsReducer
});

export default reducer;
