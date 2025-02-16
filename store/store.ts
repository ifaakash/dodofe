import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./slice/invoiceSlice";
import dodoPageReducer from "./slice/dodoPageSlice";
import blocksReducer from "./slice/blocksSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    dodoPage: dodoPageReducer,
    blocks: blocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
