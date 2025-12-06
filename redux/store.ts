import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import filtersReducer from "@/redux/slices/filterSlice";
import chartsReducer from "@/redux/slices/chartSlice";
import listReducer from "@/redux/slices/listSlice";

const createPersistStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: async () => null,
      setItem: async (_key: string, value: string) => value,
      removeItem: async () => undefined
    };
  }
  return createWebStorage("local");
};

const storage = createPersistStorage();

const rootReducer = combineReducers({
  filters: filtersReducer,
  charts: chartsReducer,
  list: listReducer
});

const persistConfig = {
  key: "dashboard",
  storage,
  whitelist: ["filters"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["_persist"]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
