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
  gst: null,
  tds: null,
  discount: null,
  note: "",
  dueDate: "",
  invoiceDate: "",
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

    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item: any) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
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
      state.invoiceDate = action.payload;
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
