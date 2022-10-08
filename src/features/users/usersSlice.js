import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, name: 'Cristian F. Tovar' },
  { id: 1, name: 'Cristian0 Ronaldo' },
  { id: 2, name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer;
