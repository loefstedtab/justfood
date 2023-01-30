import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../slices/authSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../slices/authSlice";
