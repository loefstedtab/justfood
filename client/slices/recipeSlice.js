import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editRecipe = createAsyncThunk(
  "/editRecipe",
  async (updatedRecipe) => {
    try {
      const { data } = await axios.put(`/api/updateRecipe`, updatedRecipe);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editRecipe.fulfilled, (state, action) => {
      state.status = "Recipe Loaded!";
      state.recipe = action.payload
    });
    builder.addCase(editRecipe.pending, (state, action) => {
      state.status = "Recipe Loading";
    });
  },
});

export const selectRecipe = (state) => {
  return state.recipe;
};

export default recipeSlice.reducer;
