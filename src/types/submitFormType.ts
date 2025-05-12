export interface SubmitBody {
    image: File;
}

export interface SubmitFormResponse {
    status: string;
    data: Data;
}

export interface Data {
    id: number;
    user_fish: string;
    position: string;
    structure: string;
    m_fish: string;
}
