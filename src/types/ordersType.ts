export interface AllOrdersType {
    data: Orders[];
}

export interface Orders {
    id: number;
    employee: Employee;
    m_fish: string;
    status: string;
    time: any;
    room: any;
}

export interface Employee {
    id: number;
    full_name: string;
    position: string;
    email: string;
    room_number: string;
    room_phone: string;
    image: string;
    online: number;
}
