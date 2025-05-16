import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeCard from './EmployeeCard';
import { useInnovationEmployeeId } from '../hooks/useInoovationEmployeesIdQuery';
import usePageTimeout from '../hooks/usePageTimeout';

const DatabaseDepartmentPage: React.FC = () => {
    usePageTimeout();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isPending } = useInnovationEmployeeId(Number(id));

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-600">Ma'lumotlar yuklanmoqda...</div>
            </div>
        );
    }

    if (!data?.data.employees.length) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-600">Xodimlar topilmadi</div>
            </div>
        );
    }

    return (
        <div className="mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif text-blue-800">
                    {data.data.name}
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 text-xl text-white bg-blue-800 rounded-md"
                >
                    Orqaga
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.employees.map((employee) => (
                    <EmployeeCard key={employee.id} {...employee} />
                ))}
            </div>
        </div>
    );
};

export default DatabaseDepartmentPage;
