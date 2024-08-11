import { configureStore } from '@reduxjs/toolkit'
import { gptPageSliceReducer} from "../../pages/gpt-page";

export const store = configureStore({
  reducer: {
    gpt: gptPageSliceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the index itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch