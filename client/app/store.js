import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../slices/userSlice";
