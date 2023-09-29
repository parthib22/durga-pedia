// NewGlobalStore.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../src/app/store";

// Define a type for the new slice state
export interface LoaderCheck {
  // Define properties for your new global variable here
  loaderCheck: any;
}

// Define the initial state for the new slice
const initialState: LoaderCheck = {
  loaderCheck: [{ status: false }], // Initialize properties as needed
};

export const NewGlobalStore = createSlice({
  name: "loadercheck", // Unique name for the new slice
  initialState,
  reducers: {
    // Define actions and reducers for the new global variable here
    setLoaderCheck: (state, action: PayloadAction<any>) => {
      state.loaderCheck = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setLoaderCheck } = NewGlobalStore.actions;

// Selector for accessing the new global variable
export const selectLoaderCheck = (state: RootState) =>
  state.loadercheck.loaderCheck;

export default NewGlobalStore.reducer;
