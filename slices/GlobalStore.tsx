import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../src/app/store";

export interface CounterState {
  value: any;
}

const initialState: CounterState = {
  value: null,
};

export const GlobalStore = createSlice({
  name: "cordinates",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { incrementByAmount } = GlobalStore.actions;

export const selectCount = (state: RootState) => state.cordinates.value;

export default GlobalStore.reducer;
