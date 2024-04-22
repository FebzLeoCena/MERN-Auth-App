import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
//save data into localstorage of the browser
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = { key: 'root', version: '1', storage };
//by default version will be -1 if not provided
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: { user: userReducer },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
