import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "../slices/userSlice";
import recipeSlice from "../slices/recipeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    recipe: recipeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../slices/userSlice";
