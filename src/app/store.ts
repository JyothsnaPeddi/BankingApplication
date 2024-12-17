// store.ts
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/counter/counterSlice.ts';

export default configureStore({
  reducer: {
    tokenLoader: tokenReducer,
  },
});
