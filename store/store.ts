import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./slice/invoiceSlice";
import dodoPageReducer from "./slice/dodoPageSlice";
import blocksReducer from "./slice/blocksSlice";
import loaderReducer from "./slice/loaderSlice";
import commonReducer from "./slice/commonSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import editInvoiceReducer from "./slice/editInvoiceSlice";


const appReducer = combineReducers({
  invoice: invoiceReducer,
  dodoPage: dodoPageReducer,
  blocks: blocksReducer,
  loader: loaderReducer,
  common: commonReducer,
  editInvoice: editInvoiceReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

// do add any reducer here that you don't want to persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["invoice", "loader", "common", "editInvoice"], // reducers that you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist saves non-serializable state
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
