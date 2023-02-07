// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const TOKEN = "token";

// /*
//   THUNKS
// */
// export const getMe = createAsyncThunk("jwt/getMe", async () => {
//   const token = window.localStorage.getItem(TOKEN);
//   try {
//     if (token) {
//       const response = await axios.get("/api/jwtUser", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } else {
//       return {};
//     }
//   } catch (err) {
//     if (err.response.data) {
//       return "ERROR", err.response.data;
//     } else {
//       return "There was an issue with your request.";
//     }
//   }
// });

// export const authenticate = createAsyncThunk(
//   "jwt/authenticate",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const response = await axios.post(`/auth/jwtLogin`, { email, password });
//       window.localStorage.setItem(TOKEN, response.data.token);
//       thunkAPI.dispatch(getMe());
//     } catch (err) {
//       if (err.response.data) {
//         return thunkAPI.rejectWithValue(err.response.data);
//       } else {
//         return "There was an issue with your request.";
//       }
//     }
//   }
// );

// export const createUser = createAsyncThunk(
//   "jwt/createUser",
//   async ({ email, password, firstName, lastName, phoneNumber }, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/jwtRegister", {
//         email,
//         password,
//         firstName,
//         lastName,
//         phoneNumber,
//       });
//       window.localStorage.setItem(TOKEN, response.data.token);
//       thunkAPI.dispatch(getMe());
//     } catch (err) {
//       if (err.response.data) {
//         return thunkAPI.rejectWithValue(err.response.data);
//       } else {
//         return "There was an issue with your request.";
//       }
//     }
//   }
// );

// export const editUser = createAsyncThunk(
//   "jwt/editUser",
//   async (updatedUser) => {
//     const token = window.localStorage.getItem(TOKEN);
//     const config = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       const { data } = await axios.put(`/api/jwtUser`, updatedUser, config);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     me: null,
//     error: null,
//     status: "idle",
//   },
//   reducers: {
//     logout(state, action) {
//       window.localStorage.removeItem(TOKEN);
//       state.me = null;
//       state.error = null;
//       state.status = "idle";
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getMe.fulfilled, (state, action) => {
//       state.status = "Succeeded";
//       state.me = action.payload;
//     });
//     builder.addCase(getMe.rejected, (state, action) => {
//       state.status = "Failed";
//       state.error = action.error.message;
//     });
//     builder.addCase(authenticate.pending, (state, action) => {
//       state.status = "Loading";
//     });
//     builder.addCase(authenticate.rejected, (state, action) => {
//       state.status = "Rejected";
//       state.error = action.payload;
//     });
//     builder.addCase(authenticate.fulfilled, (state, action) => {
//       state.status = "Succeeded";
//       return action.payload;
//     });
//     builder.addCase(createUser.fulfilled, (state, action) => {
//       state.status = "Succeeded";
//       return action.payload;
//     });
//     builder.addCase(createUser.rejected, (state, action) => {
//       state.status = "Failed";
//       state.error = action.payload;
//     });
//     builder.addCase(createUser.pending, (state, action) => {
//       state.status = "Loading";
//     });
//     builder.addCase(editUser.pending, (state, action) => {
//       state.status = "Loading";
//     });
//     builder.addCase(editUser.fulfilled, (state, action) => {
//       state.status = "Updated";
//       state.me = action.payload;
//     });
//     builder.addCase(editUser.rejected, (state, action) => {
//       state.status = "Rejected";
//     });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;
