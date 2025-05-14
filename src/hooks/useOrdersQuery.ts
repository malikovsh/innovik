import applicationStatusApi from '../api/requests/applicationStatusApi';
import { useQuery } from './useQuery';

export const useOrdersQuery = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            return await applicationStatusApi.getAllOrder();
        },
        refetchInterval(query) {
            if (query.state.data?.data.length === 0) {
                return false;
            }
            return 10000;
        },
    });
};
