import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    phoneNumber: string;
    scienceId: string;
    id?: number;
}

const initialState: FormState = {
    phoneNumber: '',
    scienceId: '',
    id: 0,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        setScienceId: (state, action: PayloadAction<string>) => {
            state.scienceId = action.payload;
        },
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        resetForm: (state) => {
            state.phoneNumber = '';
            state.scienceId = '';
            state.id = 0;
        },
    },
});

export const { setPhoneNumber, setScienceId, resetForm, setId } =
    formSlice.actions;
export default formSlice.reducer;
