import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('/user/account', async () => {
  try{
    const {data} = await axios.get('/api/user/account');
    console.log("THIS IS MY THUNK DATA", data)
    return data
  } catch(err){
    console.log(err)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState:{},
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      return action.payload
    })
  }
})

export const selectUser = (state) => {
  return state.user
}

export default userSlice.reducer
