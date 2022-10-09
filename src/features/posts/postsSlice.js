import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, } from "react-redux";
import { client } from "../../api/client"
import { sub } from 'date-fns'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return ({
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        });
      },
    },
    reactionAdded: (state, { payload }) => {
      const { postId, reaction } = payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated: (state, { payload }) => {
      const existingPost = state.posts.find(({ id }) => id === payload.id)
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
      .addCase(fetchPosts.fulfilled, ({ status, posts }, action) => {
        status = 'succeeded'
        // Add any fetched posts to the array
        posts = posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, ({ status, error }, action) => {
        status = 'failed';
        error = action.error.message
      })
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state) => {
  return state.posts.posts;
}

export const selectPostById = (state, postId) => {
  return state.posts.posts.find(({ id }) => id === postId)
}

const getPosts = async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  getPosts,
)
