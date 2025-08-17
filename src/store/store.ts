import { logout } from '@/modules/auth/auth-slice';
import { authApi } from '@/modules/auth/services/authApi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/modules/auth/auth-slice';
import userReducer from '@/modules/users/slice/userSlice';
import { usersApi } from '@/modules/users/services/userApi';


/**
 * Configures the Redux store with persistence and API middleware.
 *
 * This setup includes the following configurations:
 * - Persistence using `redux-persist`.
 * - Combination of reducers including `authApi`, `userApiSlice`, and `authReducer`.
 * - Application of default middleware and API middleware.
 *
 * @constant {object} persistConfig - Configuration for `redux-persist`, specifying the key and storage.
 * @constant {Reducer} rootReducer - The combined reducer for the Redux store.
 * @constant {Reducer} persistedReducer - The persisted version of the root reducer.
 * @constant {Store} store - The configured Redux store.
 * @constant {Persistor} persistor - The persistor instance for the store.
 *
 * @typedef {function} AppDispatch - Type for the Redux store's dispatch function.
 * @typedef {object} RootState - Type for the Redux store's state.
 */

const persistConfig = {
  key: 'assignment',
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  auth: authReducer,
  user: userReducer,
});

/**
 * Creates a root reducer that resets the state on logout.
 *
 * When the `logout` action is dispatched, the state is set to initial state,
 * effectively clearing the store. Otherwise, it processes actions normally
 * via the `rootReducer`.
 *
 * @returns {Function} A root reducer that clears the state on logout.
 */

const createReducer = () => {
  return (
    state: ReturnType<typeof rootReducer> | undefined,
    action: { type: string }
  ) => {
    if (action.type === logout.type) {
      state = {
        auth: undefined,
        user: undefined,
      } as unknown as ReturnType<typeof rootReducer>;
    }
    return rootReducer(state, action);
  };
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      usersApi.middleware,
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
