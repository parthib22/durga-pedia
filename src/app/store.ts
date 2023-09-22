import { configureStore } from '@reduxjs/toolkit'
// ...
import GlobalStore from '../../slices/GlobalStore'
import StateCheck from '../../slices/StateCheck'

export const store = configureStore({
  reducer: {
    cordinates: GlobalStore,
    statecheck: StateCheck,

  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch