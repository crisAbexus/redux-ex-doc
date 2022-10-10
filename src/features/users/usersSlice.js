import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data;
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      return payload;
    })
  }
})

export default usersSlice.reducer;

export const selectAllUsers = (state) => {
  return state.users
}

export const selectUserById = (state, userId) => {
  return state.users.find(user => {
    return user.id === userId
  })
}

