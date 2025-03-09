import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceItem, InvoiceWithDetails } from "types";

const initialState: InvoiceWithDetails = {
  items: [],
  currentClientDetails: {
    name: "",
    email: "",
    zipcode: "",
    state: "",
    city: "",
    address: "",
    gst: "",
    pan: "",
    logo: "",
  },
  currentRecipientDetails: {
    name: "",
    email: "",
    zipcode: "",
    state: "",
    city: "",
    address: "",
    gst: "",
    pan: "",
    logo: "",
  },
  currentBankDetails: {
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountName: "",
    address: "",
    upiId: "",
  },
  recipientDetailsID: null,
  bankDetailsID: null,
  gst: 0,
  tds: 0,
  discount: 0,
  note: "",
  dueDate: "",
  date: "",
  clientDetailsID: null,
  status: "",
  invoiceNumber: 0,
  subTotal: 0,
  totalAmount: 0,
  subHeading: "",
  clientDetails: {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    gst: "",
    pan: "",
    logo: "",
  },
  recipientDetails: {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    gst: "",
    pan: "",
    logo: "",
  },
  bankDetails: {
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountName: "",
    address: "",
    upiId: "",
  },
  createdAt: "",
  id: "",
  showInputFields: true,
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addCurrentClientDetails: (state, action) => {
      state.currentClientDetails = {
        ...state.currentClientDetails,
        ...action.payload,
      };
    },
    addCurrentRecipientDetails: (state, action) => {
      state.currentRecipientDetails = {
        ...state.currentRecipientDetails,
        ...action.payload,
      };
    },
    addCurrentBankDetails: (state, action) => {
      state.currentBankDetails = {
        ...state.currentBankDetails,
        ...action.payload,
      };
    },

    addItem: (state, action: PayloadAction<InvoiceItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{ index: number; updatedItem: InvoiceItem }>
    ) => {
      const { index, updatedItem } = action.payload;
      if (state.items[index]) {
        state.items[index] = updatedItem;
      }
    },
    removeItem: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items.splice(index, 1);
      }
    },

    addGst: (state, action) => {
      state.gst = action.payload;
    },
    addTds: (state, action) => {
      state.tds = action.payload;
    },
    addDiscount: (state, action) => {
      state.discount = action.payload;
    },
    addNote: (state, action) => {
      state.note = action.payload;
    },
    addDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    addClientDetailsID: (state, action) => {
      state.clientDetailsID = action.payload;
    },
    addRecipientDetailsID: (state, action) => {
      state.recipientDetailsID = action.payload;
    },
    addBankDetailsID: (state, action) => {
      state.bankDetailsID = action.payload;
    },
    addDate: (state, action) => {
      state.date = action.payload;
    },
    toggleShowInputFields: (state) => {
      state.showInputFields = !state.showInputFields;
    },
    setShowInputFields: (state, action: PayloadAction<boolean>) => {
      state.showInputFields = action.payload;
    },
  },
});

export const {
  addCurrentClientDetails,
  addCurrentRecipientDetails,
  addCurrentBankDetails,
  addItem,
  updateItem,
  removeItem,
  addGst,
  addTds,
  addDiscount,
  addNote,
  addDueDate,
  addClientDetailsID,
  addRecipientDetailsID,
  addBankDetailsID,
  addDate,
  toggleShowInputFields,
  setShowInputFields,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
