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
        toggleLogoutModalState(state) {
            state.logoutModalState = !state.logoutModalState;
        },
    },
});

export const { toggleLogoutModalState } = commonSlice.actions;

export default commonSlice.reducer;
