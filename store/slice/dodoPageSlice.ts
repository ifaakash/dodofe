import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DodoPageState {
  dodoPageImage: string | null;
  dodoPageName: string | null;
  dodoPageThought: string | null;
  socialLinks: Record<string, string> | null;
  audioBio: string | null;
  unsavedChanges: boolean;
  dodoPageId: string | null;
}
const initialState: DodoPageState = {
  dodoPageImage: null,
  dodoPageName: null,
  dodoPageThought: null,
  socialLinks: null,
  audioBio: null,
  unsavedChanges: false,
  dodoPageId: null,
};

const dodoPageSlice = createSlice({
  name: "dodoPage",
  initialState,
  reducers: {
    updateDodoPageProfilePicture: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.dodoPageImage = action.payload;
      state.unsavedChanges = true;
    },
    setDodoPageName: (state, action: PayloadAction<string>) => {
      state.dodoPageName = action.payload;
      state.unsavedChanges = true;
    },
    setDodoPageThought: (state, action: PayloadAction<string | null>) => {
      state.dodoPageThought = action.payload ?? "";
      state.unsavedChanges = true;
    },
    setSocialLinks: (state, action: PayloadAction<Record<string, string>>) => {
      state.socialLinks = action.payload;
      state.unsavedChanges = true;
    },
    setUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.unsavedChanges = action.payload;
    },
    setDodoPageId: (state, action: PayloadAction<string | null>) => {
      state.dodoPageId = action.payload;
    },
  },
});
export const {
  updateDodoPageProfilePicture,
  setDodoPageName,
  setDodoPageThought,
  setSocialLinks,
  setUnsavedChanges,
  setDodoPageId,
} = dodoPageSlice.actions;
export default dodoPageSlice.reducer;
