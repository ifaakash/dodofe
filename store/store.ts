import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./slice/invoiceSlice";
import dodoPageReducer from "./slice/dodoPageSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    dodoPage: dodoPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
