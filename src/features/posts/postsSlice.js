import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: '1', title: 'first Post!', content: 'Helo!' },
  { id: '2', title: 'Second Post!', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content) => {
        return ({
          payload: {
            id: nanoid(),
            title,
            content,
          }
        })
      }
    },

    postUpdated: (state, { payload }) => {
      const existingPost = state.find(({ id }) => id === payload.id)
      if (existingPost) {
        existingPost.title = payload.title;
        existingPost.content = payload.content;
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;
