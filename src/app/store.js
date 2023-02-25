import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "../features/posts/postsSlice";
import usersSlice from "../features/users/usersSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";
import { apiSlice } from "../features/api/apiSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
    notifications: notificationsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
})
