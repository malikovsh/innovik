import { useDispatch } from 'react-redux';
import userSubmitFormApi from '../api/requests/userSubmitFormApi';
import { useMutation } from './useQuery';
import {
    setId,
    setMFish,
    setPosition,
    setStructure,
    setUserFish,
} from '../store/applicationSlice';

export const useSubmitForm = () => {
    const dispatch = useDispatch();

    const mutate = useMutation({
        mutationFn: async (body: {
            image: File;
            scienceid: string;
            phone: string;
            user_id: string;
        }) => {
            const response = await userSubmitFormApi.submitForm(body);
            return response;
        },
        onSuccess: (data) => {
            dispatch(setId(data.data.id));
            dispatch(setUserFish(data.data.user_fish));
            dispatch(setPosition(data.data.position));
            dispatch(setStructure(data.data.structure));
            dispatch(setMFish(data.data.m_fish));
        },
        onError: (error) => {
            console.error('Xatolik yuz berdi: ' + error.message);
            throw error;
        },
    });

    return {
        ...mutate,
        data: mutate.data,
    };
};
