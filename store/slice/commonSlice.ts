import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
    logoutModalState: boolean;
}

const initialState: CommonState = {
    logoutModalState: false,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        hideLogoutModalState(state) {
            state.logoutModalState = false;
        },
        showLogoutModalState(state) {
            state.logoutModalState = true;
        },
    },
});

export const { hideLogoutModalState, showLogoutModalState } = commonSlice.actions;

export default commonSlice.reducer;
