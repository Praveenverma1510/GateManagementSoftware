import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import guardReducer from './guardSlice';

const store = configureStore({
  reducer: {
    gates: gateReducer,
    guards: guardReducer,
  },
});

export default store;
