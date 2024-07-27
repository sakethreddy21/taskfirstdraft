import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { appReducer, IAppSlice } from './app-slice';
import storage from 'redux-persist/lib/storage';


interface IStoreState {
  app: IAppSlice;
}

const rootPersistConfig = {
  key: 'draft',
  storage,
};

const appPersistConfig = {
  key: 'draft-app',
  storage,
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
 
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),

  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['register', 'rehydrate'],
      },
    }),
});

const persistor = persistStore(store);

export default store;
export { persistor };
export type RootDispatch = ReturnType<typeof store.dispatch>;
export type { IStoreState };
