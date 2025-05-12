import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import applicationReducer from './applicationSlice';

export const store = configureStore({
    reducer: {
        form: formReducer,
        application: applicationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
