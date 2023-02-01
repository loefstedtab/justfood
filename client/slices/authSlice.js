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
  console.log('TOKEN FROM GETME', token)
  try {
    console.log('TOKEN INSIDE TRY CATCH THING', token)
    if (token) {
      console.log('TOKEN INSIDE IF INSIDE TRY CATCH THING', token)
      const response = await axios.get("/api/jwtUser", {
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      console.log('response from getMe thunk', response)
      return response.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "jwt/authenticate",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log('EMAIL FROM THUNK', email, 'PASSWORD FROM THUNK', password)
      const response = await axios.post(`/api/jwtLogin`, { email, password });
      console.log('THIS IS RESPONSE FROM THUNK', response)
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
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
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
