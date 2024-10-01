import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reduxStorage } from './storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({

});

const persistConfig = {
    key: 'root',
    storage: reduxStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
