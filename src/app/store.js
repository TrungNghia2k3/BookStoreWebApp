import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../features/products/productSlice";
import loadingReducer from "../features/loading/loadingSlice";
import { startLoading, stopLoading } from "../features/loading/loadingSlice";
import { setStoreReference } from "../configurations/httpClient";

const rootReducer = {
  counter: counterReducer,
  auth: authReducer, 
  products: productReducer,
  cart: cartReducer,
  category: categoryReducer,
  loading: loadingReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

// Set store reference for httpClient to avoid circular dependency
setStoreReference(store, { startLoading, stopLoading });

export default store;
