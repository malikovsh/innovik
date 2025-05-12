export interface InovationAllEmployee {
    data: Data[];
}

export interface Data {
    id: number;
    name: string;
    type: string;
    employees: Employee[];
}

export interface Employee {
    id: number;
    full_name: string;
    position: string;
    email: string;
    room_number?: string;
    room_phone?: string;
    image: string;
    online: number;
}

export interface AllEmployeeId {
    data: Data;
}

export interface Data {
    id: number;
    name: string;
    type: string;
    employees: Employee[];
}

export interface OneEmployee {
    data: Employee;
}
