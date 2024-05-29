import { createSlice } from '@reduxjs/toolkit';

const gateSlice = createSlice({
  name: 'gates',
  initialState: [],
  reducers: {
    addGate: (state, action) => {
      state.push(action.payload);
    },
    updateGate: (state, action) => {
      const index = state.findIndex(gate => gate.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteGate: (state, action) => {
      const index = state.findIndex(gate => gate.id === action.payload);
      if (index !== -1) {
        state[index].deleted = true;
      }
    },
  },
});

export const { addGate, updateGate, deleteGate } = gateSlice.actions;
export default gateSlice.reducer;
