import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => {
        return '/posts'
      },
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (postId) => {
        return `/posts/${postId}`
      },
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => {
        return {
          url: '/posts',
          method: 'POST',
          body: initialPost,
        }
      },
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `/post/${post.id}`,
        method: 'PATCH',
        body: post,
      })
    }),
    getUsers: builder.query({
      query: () => {
        return '/users'
      }
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => {
        return ({
          url: `posts/${postId}/reactions`,
          method: 'POST',
          body: { reaction }
        })
      },
      invalidatesTags: (result, error, arg) => {
        return [
          { type: 'Post', id: arg.postId }
        ]
      }
    }),
    async onQueryStarted({ postId, reaction }, { dispatch, queryFUlfilled }) {
      const patchResult = dispatch(
        apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
          const post = draft.find(post => {
            return post.id === postId
          })
          if (post) {
            post.reactions[reaction]++;
          }
        })
      )
      try {
        await queryFUlfilled;
      } catch {
        patchResult.undo();
      }
    }
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation, useEditPostMutation, useGetUsersQuery, useAddReactionMutation } = apiSlice;
