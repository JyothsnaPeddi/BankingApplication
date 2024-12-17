import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from '../utils/tokenSlice.js';


export default configureStore({
  reducer: {
    tokenLoader: tokenReducer,
  },
});

