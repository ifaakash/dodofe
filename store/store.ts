import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./slice/invoiceSlice";

export const store = configureStore({
    reducer: {
        invoice: invoiceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;