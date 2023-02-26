import { createAsyncThunk, createEntityAdapter, createSelector, } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice';
import { client } from "../../api/client";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => {
        return "/users";
      }
    })
  })
})

export const { userGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();
/* const usersAdapter = createEntityAdapter(); */

/* const initialState = usersAdapter.getInitialState(); */
const emptyUsers = []
export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => {
    return usersResult?.data ?? emptyUsers
  }
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => {
    return userId;
  },
  (users, userId) => {
    return users.find(user => user.id === userId);
  },
)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data;
})


/* export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors((state) => { */
/*   return state.users */
/* }) */
