import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../slices/jwtUserSlice";
import userSlice from "../slices/googleUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../slices/jwtUserSlice";
