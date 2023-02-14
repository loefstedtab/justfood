import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const fetchGoogleUser = createAsyncThunk("/googleUser", async () => {
  try {
    const { data } = await axios.get("/api/googleUser");
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const getMe = createAsyncThunk("jwt/getMe", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const response = await axios.get("/api/jwtUser", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return "ERROR", err.response.data;
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "jwt/authenticate",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`/auth/jwtLogin`, { email, password });
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

export const createUser = createAsyncThunk(
  "jwt/createUser",
  async ({ email, password, firstName, lastName, phoneNumber }, thunkAPI) => {
    try {
      const response = await axios.post("/api/jwtRegister", {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });
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

export const editUser = createAsyncThunk(
  "jwt/editUser",
  async (updatedUser, thunkAPI) => {
    const token = window.localStorage.getItem(TOKEN);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(`/api/jwtUser`, updatedUser, config);
      thunkAPI.dispatch(getMe());
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editGoogleUser = createAsyncThunk('google/editUser', async (updatedUser, thunkAPI) => {
  try{
    const {data} = await axios.put('/api/editGoogle', updatedUser);
    thunkAPI.dispatch(fetchGoogleUser())
    return data
  } catch (err) {
    console.log(err)
  }
})

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoogleUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.status = "getMe Succeeded";
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = "getMe Failed";
      state.error = action.error.message;
    });
    builder.addCase(getMe.pending, (state, action) => {
      state.status = "getMe Loading";
    });
    builder.addCase(authenticate.pending, (state, action) => {
      state.status = "auth Loading";
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      console.log('STATE.STATUS from builder', state.status)
      state.status = "auth Rejected";
      state.error = action.payload;

    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.status = "auth Succeeded";
      state.user = action.payload;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = "createUser Succeeded";
      state.user = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = "createUser Failed";
      state.error = action.payload;
    });
    builder.addCase(createUser.pending, (state, action) => {
      state.status = "createUser Loading";
    });
    builder.addCase(editUser.pending, (state, action) => {
      state.status = "editUser Loading";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "editUser Updated";
      state.user = action.payload;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.status = "editUser Rejected";
    });
    builder.addCase(editGoogleUser.fulfilled, (state, action) => {
      state.status = "editGoogleUser Google Updated"
    })
  },
});

export const selectUser = (state) => {
  return state.user;
};

export default userSlice.reducer;
