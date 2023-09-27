import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../src/app/store'

// Define a type for the slice state
export interface CounterState {
  value: any
}

// Define the initial state using that type
const initialState: CounterState = {
  value: null
}

export const GlobalStore = createSlice({
  name: 'cordinates',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  }
})

export const {  incrementByAmount } = GlobalStore.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cordinates.value

export default GlobalStore.reducer