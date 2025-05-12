import innovationOneEmployeeApi from '../api/requests/innovationOneEmployeeApi';
import { useQuery } from './useQuery';

export const useInnovationOneEmployee = (id: number) => {
    return useQuery({
        queryKey: ['innovationOneEmployee', id],
        queryFn: async () => {
            return await innovationOneEmployeeApi.getOneEmployee(id);
        },
        enabled: !!id, // faqat id mavjud bo‘lsa ishlaydi
    });
};
