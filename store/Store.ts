import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/AuthSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, AuthReducer),
  },
});

export const persistor = persistStore(store);

export default store;
