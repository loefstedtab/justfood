import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/
export const getMe = createAsyncThunk(
  "jwt/getMe",
  async (thunkAPI) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const response = await axios.get("/api/jwtUser", {
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return ("ERROR" , err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "jwt/authenticate",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/jwtLogin`, { email, password });
      window.localStorage.setItem(TOKEN, response.data.token);
      thunkAPI.dispatch(getMe());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.getMe = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      console.log("THIS IS THE GET ME BUILDER REJECTED ERROR", action.error)
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      // action.error.message = "NOT AUTHORIZED"
      state.error = action.error.message
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

/*
  REDUCER
*/
export default authSlice.reducer;
