import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    scienceId: string;
    id?: number;
    problem: string;
}

const initialState: FormState = {
    scienceId: '',
    id: 0,
    problem: '',
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
        setProblem: (state, action: PayloadAction<string>) => {
            state.problem = action.payload;
        },
        resetForm: (state) => {
            state.scienceId = '';
            state.id = 0;
            state.problem = '';
        },
    },
});

export const { setScienceId, resetForm, setId, setProblem } = formSlice.actions;
export default formSlice.reducer;
