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
    })
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice;
