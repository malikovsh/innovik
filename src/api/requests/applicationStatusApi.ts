import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { AllOrdersType } from '../../types/ordersType';

const urls = {
    getAll: '/api/order',
};

export class AllOrderAPI {
    constructor(private api = baseApiClient) {}

    getAllOrder = async () => {
        const result: AxiosResponse<AllOrdersType> = await this.api.get(
            urls.getAll
        );

        return result.data;
    };
}

export default new AllOrderAPI();
