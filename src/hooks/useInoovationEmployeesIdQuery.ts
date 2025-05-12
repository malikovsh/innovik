import innovationEmployeeIdApi from '../api/requests/innovationEmployeeIdApi';
import { useQuery } from './useQuery';

export const useInnovationEmployeeId = (id: number) => {
    return useQuery({
        queryKey: ['innovationEmployee', id],
        queryFn: async () => {
            return await innovationEmployeeIdApi.getEmployeesData(id);
        },
        enabled: !!id, // faqat id mavjud bo‘lsa ishlaydi
    });
};
