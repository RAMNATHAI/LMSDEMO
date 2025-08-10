import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import coursesSlice from './slices/coursesSlice';
import notificationsSlice from './slices/notificationsSlice';
import skillsSlice from './slices/skillsSlice';
import personalizedSlice from './slices/personalizedSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    courses: coursesSlice,
    notifications: notificationsSlice,
    skills: skillsSlice,
    personalized: personalizedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
