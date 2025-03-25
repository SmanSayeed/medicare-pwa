// redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import { apiSlice } from './api/apiSlice';
import { authApi } from './api/authApi';
import { doctorsApi } from './api/doctorsApi';
import { appointmentApi } from './api/appointmentApi';

// Combine all the reducers
const rootReducer = combineReducers({
  user: userReducer,  // Assuming userReducer holds user-related state such as the token
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [doctorsApi.reducerPath]: doctorsApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    apiSlice.reducerPath,
    authApi.reducerPath,
    doctorsApi.reducerPath,
    appointmentApi.reducerPath,
  ],
};

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      apiSlice.middleware,
      authApi.middleware,
      doctorsApi.middleware,
      appointmentApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);