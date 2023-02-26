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
        return '/suers'
      }
    })
  }),
})

console.log(`🇸🇰%capiSlice.js:44 - apiSlice`, 'font-weight:bold; background:#8e7100;color:#fff;');
console.log(apiSlice);
console.log(`🪙%capiSlice.js:46 - apiSlice.endpoints`, 'font-weight:bold; background:#916e00;color:#fff;');
console.log(apiSlice.endpoints);
console.log(`🥘%capiSlice.js:48 - apiSlice.endpoints.getUsers`, 'font-weight:bold; background:#936c00;color:#fff;');
console.log(apiSlice.endpoints.getUsers);
console.log(`📫%capiSlice.js:50 - apiSlice.endpoints.getUsers.useQuery`, 'font-weight:bold; background:#966900;color:#fff;');
console.log(apiSlice.endpoints.getUsers.useQuery);
console.log(`🇹🇱%capiSlice.js:52 - apiSlice.endpoints.getUsers.useLazyQuery`, 'font-weight:bold; background:#996600;color:#fff;');
console.log(apiSlice.endpoints.getUsers.useLazyQuery);
console.log(`🇪🇭%capiSlice.js:54 - apiSlice.endpoints.getUsers.useLazyQuerySubscription`, 'font-weight:bold; background:#9b6400;color:#fff;');
console.log(apiSlice.endpoints.getUsers.useLazyQuerySubscription);
console.log(`🇨🇨%capiSlice.js:56 - apiSlice.endpoints.getUsers.matchPending`, 'font-weight:bold; background:#9e6100;color:#fff;');
console.log(apiSlice.endpoints.getUsers.matchPending);
console.log(`🏦%capiSlice.js:58 - apiSlice.endpoints.getUsers.matchFulfilled`, 'font-weight:bold; background:#a05f00;color:#fff;');
console.log(apiSlice.endpoints.getUsers.matchFulfilled);
console.log(`🆔%capiSlice.js:60 - apiSlice.endpoints.getUsers.matchRejected`, 'font-weight:bold; background:#a25d00;color:#fff;');
console.log(apiSlice.endpoints.getUsers.matchRejected);
console.log(`☠️%capiSlice.js:62 - apiSlice.endpoints.getUsers.initiate`, 'font-weight:bold; background:#a45b00;color:#fff;');
console.log(apiSlice.endpoints.getUsers.initiate);
console.log(`🇬🇱%capiSlice.js:64 - apiSlice.endpoints.getUsers.select`, 'font-weight:bold; background:#a65900;color:#fff;');
console.log(apiSlice.endpoints.getUsers.select);
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation, useEditPostMutation, useGetUsersQuery } = apiSlice;
