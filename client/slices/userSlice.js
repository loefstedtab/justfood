import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('/loggedInUser/home', async () => {
  try{
    const {data} = await axios.get('/api/home');
    console.log("THIS IS MY THUNK DATA", data)
    return data
  } catch(err){
    console.log(err)
  }
})

export const fetchLogout = createAsyncThunk('/loggedInUser/logout', async () => {
  try{
    const {data} = await axios.get('/api/logout');
    return data
  }catch (err){
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
