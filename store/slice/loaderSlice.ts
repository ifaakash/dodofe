import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
    isVisible: boolean;
    showOverlay: boolean;
}

const initialState: LoaderState = {
    isVisible: false,
    showOverlay: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoader: (state, action: PayloadAction<boolean>) => {
            state.isVisible = true;
            state.showOverlay = action.payload;
        },
        hideLoader: (state, action: PayloadAction<boolean>) => {
            state.isVisible = false;
            state.showOverlay = action.payload;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;