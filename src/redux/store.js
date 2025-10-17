import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn', 'lang', 'balance', 'refLink'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
