// ** Library Imports
import { configureStore } from "@reduxjs/toolkit";

// ** Module Imports
import cartSlice from "./slices/cartSlice";
import storeDataSlice from "./slices/storeDataSlice";
import api from "./slices/testSlice";
import categorySlice from "./slices/categorySlice";
import getCartSlice from "./slices/getCartSlice";
import menuSlice from "./slices/menuSlice";
import logoSlice from "./slices/logoSlice";
import pagesSlice from "./slices/pagesSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    store: storeDataSlice,
    category: categorySlice,
    getCart: getCartSlice,
    menus: menuSlice,
    media: logoSlice,
    pages: pagesSlice,
    test: api,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
