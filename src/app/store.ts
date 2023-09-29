import { configureStore } from '@reduxjs/toolkit'
// ...
import GlobalStore from '../../slices/GlobalStore'
import StateCheck from '../../slices/StateCheck'
import LoaderCheck from '../../slices/LoaderCheck'

export const store = configureStore({
  reducer: {
    cordinates: GlobalStore,
    statecheck: StateCheck,
    loadercheck: LoaderCheck,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch