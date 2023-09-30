import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../src/app/store";

export interface StateCheck {
  someProperty: any;
}

const initialState: StateCheck = {
  someProperty: [{ status: null, kar: null }],
};

export const NewGlobalStore = createSlice({
  name: "statecheck",
  initialState,
  reducers: {
    setSomeProperty: (state, action: PayloadAction<any>) => {
      state.someProperty = action.payload;
    },
  },
});

export const { setSomeProperty } = NewGlobalStore.actions;

export const selectSomeProperty = (state: RootState) =>
  state.statecheck.someProperty;

export default NewGlobalStore.reducer;
