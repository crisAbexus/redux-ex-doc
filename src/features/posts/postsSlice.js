import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: '1', title: 'first Post!', content: 'Helo!', user: 1 },
  { id: '2', title: 'Second Post!', content: 'More text', user: 1 },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return ({
          payload: {
            id: nanoid(),
            title,
            content,
            user: userID,
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
