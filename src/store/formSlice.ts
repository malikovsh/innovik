import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    scienceId: string;
    id?: number;
}

const initialState: FormState = {
    scienceId: '',
    id: 0,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setScienceId: (state, action: PayloadAction<string>) => {
            state.scienceId = action.payload;
        },
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        resetForm: (state) => {
            state.scienceId = '';
            state.id = 0;
        },
    },
});

export const { setScienceId, resetForm, setId } = formSlice.actions;
export default formSlice.reducer;
