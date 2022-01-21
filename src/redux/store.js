import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contactSlice.js';
// import logger from 'redux-logger';
import filterReducer from './reducer.js';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   REGISTER,
//   PURGE,
//   PERSIST,
// } from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'contacts',
//   storage,
// };

// const middleware = {
//   serializableCheck: {
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
// };

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
// });

// const persisterReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

// export const persistor = persistStore(store);

export default store;