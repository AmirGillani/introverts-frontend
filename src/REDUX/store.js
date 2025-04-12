

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../REDUX/authReducer';
import postsReducer from '../REDUX/postReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts:postsReducer
  },
});
