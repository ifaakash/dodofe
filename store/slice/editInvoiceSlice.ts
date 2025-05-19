
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isUpdated: false,
  bankDetails: {
    _id: "",
    accountNumber: "",
    accountName: "",
    ifsc: "",
    bankName: "",
    branchName: "",
  },
  clientDetails: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  recipientDetails: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  items: [],
  gst: "",
  tds: "",
  discount: "",
  dueDate: "",
  invoiceNumber: "",
  note: "",
  isBankDetailsUpdated: false,
  isClientDetailsUpdated: false,
  isRecipientDetailsUpdated: false,
  isItemsUpdated: false,
  invoiceDate: "",
}

export const editInvoiceSlice = createSlice({
  name: "editInvoice",
  initialState,
  reducers: {
    setInvoice: (state, action) => {
      state.id = action.payload.id;
      state.bankDetails = action.payload.bankDetails;
      state.clientDetails = action.payload.clientDetails;
      state.recipientDetails = action.payload.recipientDetails;
      state.items = action.payload.items;
      state.gst = action.payload.gst;
      state.tds = action.payload.tds;
      state.discount = action.payload.discount;
      state.dueDate = action.payload.dueDate;
      state.invoiceDate = action.payload.invoiceDate;
      state.invoiceNumber = action.payload.invoiceNumber;
      state.note = action.payload.note;
    },
    updateBankDetails: (state, action) => {
      state.bankDetails = action.payload;
      state.isBankDetailsUpdated = true;
    },
    updateClientDetails: (state, action) => {
      state.clientDetails = action.payload;
      state.isClientDetailsUpdated = true;
    },
    updateRecipientDetails: (state, action) => {
      state.recipientDetails = action.payload;
      state.isRecipientDetailsUpdated = true;
    },
    updateItems: (state, action) => {
      state.items = action.payload;
      state.isItemsUpdated = true;
    },
    deleteItem: (state, action) => {
      const indexToDelete = action.payload;
      console.log('indexToDelete', indexToDelete)
      state.items = state.items.map((item, index) =>
        index === indexToDelete
          ? { ...item, isDeleted: true }
          : item
      );
      state.isItemsUpdated = true;
    },
    addNewItem: (state, action) => {
      const newItem = {
        ...action.payload,
        isNewItem: true,
      };
      state.items = [...state.items, newItem];
      state.isItemsUpdated = true;
    },
    updateNote: (state, action) => {
      state.note = action.payload;
      state.isUpdated = true;
    },
    updateDueDate: (state, action) => {
      state.dueDate = action.payload;
      state.isUpdated = true;
    },
    updateDiscount: (state, action) => {
      state.discount = action.payload;
      state.isUpdated = true;
    },
    updateGst: (state, action) => {
      state.gst = action.payload;
      state.isUpdated = true;
    },
    updateTds: (state, action) => {
      state.tds = action.payload;
      state.isUpdated = true;
    },
  },
})
export const { setInvoice, updateBankDetails, updateClientDetails, updateRecipientDetails, updateItems, updateNote, deleteItem, addNewItem, updateDueDate, updateDiscount, updateGst, updateTds } = editInvoiceSlice.actions;
export default editInvoiceSlice.reducer;