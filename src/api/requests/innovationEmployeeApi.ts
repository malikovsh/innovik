import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { InovationAllEmployee } from '../../types/InnovationType';

const urls = {
    getAll: '/api/structure',
};

export class InnovationEmployeeAPI {
    constructor(private api = baseApiClient) {}

    getAllEmployee = async () => {
        const result: AxiosResponse<InovationAllEmployee> = await this.api.get(
            urls.getAll
        );

        return result.data;
    };
}

export default new InnovationEmployeeAPI();
