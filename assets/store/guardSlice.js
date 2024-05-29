import { createSlice } from '@reduxjs/toolkit';

const guardSlice = createSlice({
  name: 'guards',
  initialState: [],
  reducers: {
    assignGuard: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { assignGuard } = guardSlice.actions;
export default guardSlice.reducer;
