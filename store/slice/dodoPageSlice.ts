import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocialLink {
  key: string;
  value: string;
}

const initialState = {
   dodoPageImage: "",
   dodoPageName: "",
   dodoPageThought: "",
   socialLinks: [] as SocialLink[],
   audioBio: "",
}

const dodoPageSlice = createSlice({
    name: 'dodoPage',
    initialState,
    reducers: {
       setDodoPageImage: (state, action: PayloadAction<string>) => {
        state.dodoPageImage = action.payload
       },
       setDodoPageName: (state, action: PayloadAction<string>) => {
        state.dodoPageName = action.payload
       },
       setDodoPageThought: (state, action: PayloadAction<string>) => {
        state.dodoPageThought = action.payload
       },
       setSocialLinks: (state, action: PayloadAction<{ [key: string]: string }>) => {
           state.socialLinks = Object.entries(action.payload).map(([key, value]) => ({ key, value }));
       }
    },
})
export const { setDodoPageImage, setDodoPageName, setDodoPageThought, setSocialLinks } = dodoPageSlice.actions
export default dodoPageSlice.reducer