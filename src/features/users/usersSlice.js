import { createEntityAdapter, createSelector, } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => {
        return "/users";
      }
    }),
    transformResponse: (responseData) => {
      return usersAdapter.setAll(initialState, responseData);
    }
  })
})

export const { userGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => {
    return usersResult.data;
  }
)

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors((state) => {
  const response = selectUsersData(state)
  const data = response?.data ?? []
  return { ids: data, entities: {} } ?? initialState
})
