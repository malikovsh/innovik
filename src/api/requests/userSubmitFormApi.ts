import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { SubmitFormResponse } from '../../types/submitFormType';

const urls = {
    sendApplication: '/api/acceptanceapi',
};

export class SubmitFormAPI {
    constructor(private api = baseApiClient) {}

    async submitForm({
        image,
        scienceid,
        user_id,
    }: {
        image: File;
        scienceid: string;
        user_id: string;
    }): Promise<SubmitFormResponse> {
        const formData = new FormData();
        formData.append('image', image);

        const result: AxiosResponse<SubmitFormResponse> = await this.api.post(
            urls.sendApplication,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    scienceid,
                    user_id,
                },
            }
        );

        return result.data;
    }
}

export default new SubmitFormAPI();
