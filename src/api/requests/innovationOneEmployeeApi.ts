import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { OneEmployee } from '../../types/InnovationType';

const urls = {
    getOneEmployee: (id: number) => `/api/employees/${id}`,
};

export class InnovationOneEmployeeAPI {
    constructor(private api = baseApiClient) {}

    getOneEmployee = async (id: number) => {
        const result: AxiosResponse<OneEmployee> = await this.api.get(
            urls.getOneEmployee(id)
        );

        return result.data;
    };
}

export default new InnovationOneEmployeeAPI();
