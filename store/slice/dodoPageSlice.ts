import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DodoPageState {
  dodoPageId: string | null;
  dodoPageImage: File | null | string;
  dodoPageName: string | null;
  dodoPageThought: string | null;
  socialLinks: { key: string; value: string; }[] | null;
  audioBio: File | null | string;
  unsavedChanges?: boolean;
  isImageChanged?: boolean;
  isAudioBioChanged?: boolean;
  isSocialLinksChanged?: boolean;
}
const initialState: DodoPageState = {
  dodoPageId: null,
  dodoPageImage: null,
  dodoPageName: null,
  dodoPageThought: null,
  socialLinks: null,
  audioBio: null,
  unsavedChanges: false,
  isImageChanged: false,
  isAudioBioChanged: false,
  isSocialLinksChanged: false,
};

const dodoPageSlice = createSlice({
  name: "dodoPage",
  initialState,
  reducers: {
    dodoStoreInitialisation: (state, action: PayloadAction<DodoPageState>) => {
      state.dodoPageId = action.payload.dodoPageId || null;
      state.dodoPageImage = action.payload.dodoPageImage || null;
      state.dodoPageName = action.payload.dodoPageName || null;
      state.dodoPageThought = action.payload.dodoPageThought || null;
      state.socialLinks = action.payload.socialLinks || null;
      state.audioBio = action.payload.audioBio || null;
    },
    updateDodoPageProfilePicture: (state, action: PayloadAction<File | null | string>) => {
      state.dodoPageImage = action.payload;
      state.unsavedChanges = true;
    },
    updateDodoPageAudioBio: (state, action: PayloadAction<File | null | string>) => {
      console.log('action.payload', action.payload);
      state.audioBio = action.payload;
      state.unsavedChanges = true;
    },
    setDodoPageName: (state, action: PayloadAction<string>) => {
      console.log('Page Name', action.payload);
      state.dodoPageName = action.payload;
      state.unsavedChanges = true;
    },
    setDodoPageThought: (state, action: PayloadAction<string | null>) => {
      state.dodoPageThought = action.payload ?? "";
      state.unsavedChanges = true;
    },
    setSocialLinks: (state, action: PayloadAction<[] | null>) => {
      state.socialLinks = action.payload;
      state.unsavedChanges = true;
    },
    resetDodoPage: (state) => {
      state.dodoPageImage = null;
      state.dodoPageName = null;
      state.dodoPageThought = null;
      state.socialLinks = null;
      state.audioBio = null;
      state.unsavedChanges = false;
      state.isImageChanged = false;
      state.isAudioBioChanged = false;
    },
    setIsImageChanged: (state, action: PayloadAction<boolean>) => {
      state.isImageChanged = action.payload;
    },
    setIsAudioBioChanged: (state, action: PayloadAction<boolean>) => {
      state.isAudioBioChanged = action.payload;
    },
    setIsSocialLinksChanged: (state, action: PayloadAction<boolean>) => {
      state.isSocialLinksChanged = action.payload;
    },
  },
});
export const {
  updateDodoPageProfilePicture,
  setDodoPageName,
  setDodoPageThought,
  setSocialLinks,
  updateDodoPageAudioBio,
  dodoStoreInitialisation,
  resetDodoPage,
  setIsImageChanged,
  setIsAudioBioChanged,
  setIsSocialLinksChanged,
} = dodoPageSlice.actions;
export default dodoPageSlice.reducer;
