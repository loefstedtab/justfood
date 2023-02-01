import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoogleUser = createAsyncThunk("/googleUser", async () => {
  try {
    const { data } = await axios.get("/api/googleUser");
    return data;
  } catch (err) {
    console.log(err);
  }
});

// export const fetchJwtUser = createAsyncThunk('/jwtUser',
// async () => {
//   try{
//     const { data } = await axios.get('/api/jwtUser');
//     return data;
//   }catch(err){
//     console.log(err);
//   }
// });

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoogleUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = (state) => {
  return state.user;
};

export default userSlice.reducer;
