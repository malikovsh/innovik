import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { AllEmployeeId } from '../../types/InnovationType';

const urls = {
    getEmployees: (id: number) => `/api/structure/${id}`,
};

export class InnovationEmployeesIdAPI {
    constructor(private api = baseApiClient) {}

    getEmployeesData = async (id: number) => {
        const result: AxiosResponse<AllEmployeeId> = await this.api.get(
            urls.getEmployees(id)
        );

        return result.data;
    };
}

export default new InnovationEmployeesIdAPI();
