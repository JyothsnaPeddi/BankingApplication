// rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './AuthSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers if needed
});

export default rootReducer;

