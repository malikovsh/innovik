import innovationEmployeeApi from '../api/requests/innovationEmployeeApi';
import { useQuery } from './useQuery';

export const useInnovationEmployeeQuery = () => {
    return useQuery({
        queryKey: ['innovationEmployee'],
        queryFn: async () => {
            return await innovationEmployeeApi.getAllEmployee();
        },
    });
};
