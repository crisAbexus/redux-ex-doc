import { createAsyncThunk, createEntityAdapter, createSelector, } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice';
import { client } from "../../api/client";

/* const usersAdapter = createEntityAdapter(); */

/* const initialState = usersAdapter.getInitialState(); */
export const selectUsersResult = apiSlice.endpoints.getUsers.select()
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

export default selectAllUsers.reducer;

/* export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors((state) => { */
/*   return state.users */
/* }) */
