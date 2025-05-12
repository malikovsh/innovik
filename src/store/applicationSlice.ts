import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplicationState {
    id: number;
    user_fish: string;
    position: string;
    structure: string;
    m_fish: string;
}

const initialState: ApplicationState = {
    id: 0,
    user_fish: '',
    position: '',
    structure: '',
    m_fish: '',
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setUserFish: (state, action: PayloadAction<string>) => {
            state.user_fish = action.payload;
        },
        setPosition: (state, action: PayloadAction<string>) => {
            state.position = action.payload;
        },
        setStructure: (state, action: PayloadAction<string>) => {
            state.structure = action.payload;
        },
        setMFish: (state, action: PayloadAction<string>) => {
            state.m_fish = action.payload;
        },
        resetForm: (state) => {
            state.id = 0;
            state.user_fish = '';
            state.position = '';
            state.structure = '';
            state.m_fish = '';
        },
    },
});

export const {
    setId,
    setUserFish,
    setPosition,
    setStructure,
    setMFish,
    resetForm,
} = formSlice.actions;

export default formSlice.reducer;
