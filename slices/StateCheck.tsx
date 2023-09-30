// NewGlobalStore.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../src/app/store'

// Define a type for the new slice state
export interface StateCheck {
  // Define properties for your new global variable here
  someProperty: any,
}

// Define the initial state for the new slice
const initialState: StateCheck = {
  someProperty: [{'status':null,'kar':null}], // Initialize properties as needed
}

export const NewGlobalStore = createSlice({
  name: 'statecheck', // Unique name for the new slice
  initialState,
  reducers: {
    // Define actions and reducers for the new global variable here
    setSomeProperty: (state, action: PayloadAction<any>) => {
      state.someProperty = action.payload
    },
    // Add more reducers as needed
  },
})

export const { setSomeProperty } = NewGlobalStore.actions

// Selector for accessing the new global variable
export const selectSomeProperty = (state: RootState) => state.statecheck.someProperty

export default NewGlobalStore.reducer
