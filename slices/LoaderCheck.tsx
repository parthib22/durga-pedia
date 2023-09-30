import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../src/app/store";

export interface LoaderCheck {
  loaderCheck: any;
}

const initialState: LoaderCheck = {
  loaderCheck: [{ status: false }],
};

export const NewGlobalStore = createSlice({
  name: "loadercheck",
  initialState,
  reducers: {
    setLoaderCheck: (state, action: PayloadAction<any>) => {
      state.loaderCheck = action.payload;
    },
  },
});

export const { setLoaderCheck } = NewGlobalStore.actions;

export const selectLoaderCheck = (state: RootState) =>
  state.loadercheck.loaderCheck;

export default NewGlobalStore.reducer;
