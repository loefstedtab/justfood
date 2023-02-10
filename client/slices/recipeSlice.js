import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const editRecipe = createAsyncThunk(
  "/editRecipe",
  async (updatedRecipe) => {
    console.log("this is the updated recipe being sent to the thunk", updatedRecipe)
    try {
      const { data } = await axios.put(`/api/updateRecipe`, updatedRecipe);
    console.log("this is the updated recipe data after the axios call in the thunk", data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


const recipeSlice = createSlice({
  name: "recipe",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editRecipe.fulfilled, (state, action) => {
      return action.payload
    });
  }
})


export const selectRecipe = (state) => {
  return state.recipe;
};

export default recipeSlice.reducer;
