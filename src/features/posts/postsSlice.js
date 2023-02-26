import { createSlice, createSelector, nanoid, createAsyncThunk, createEntityAdapter, } from '@reduxjs/toolkit'
import { useDispatch, } from "react-redux";
import { client } from "../../api/client"
import { sub } from 'date-fns'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async initialPost => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data;
  }
)

const getPosts = async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
}
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  getPosts,
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: (state, { payload }) => {
      const { postId, reaction } = payload
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated: (state, { payload }) => {
      const existingPost = state.entities[payload.id];
      if (existingPost) {
        existingPost.title = payload.title;
        existingPost.content = payload.content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, ({ status }, action) => {
        status = ' loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, ({ status, error }, action) => {
        status = 'failed';
        error = action.error.message
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  }
})

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => {
  return state.posts
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

export const selectPostByUser = createSelector(
  [
    selectAllPosts, (state, userId) => {
      return userId;
    },
  ],
  (posts, userId) => {
    return posts.filter((post) => {
      return post.user === userId;
    });
  },
)

