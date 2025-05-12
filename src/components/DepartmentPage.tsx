import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/logo/defaultuser.webp';
import { useInnovationEmployeeQuery } from '../hooks/useInnovationEmployeQuery';
import { Data } from '../types/InnovationType';
import { ChevronRight } from 'lucide-react';
import usePageTimeout from '../hooks/usePageTimeout';
const API_URL = import.meta.env.VITE_BASE_URI;

const DepartmentCard: React.FC<{
    department: Data;
    onDepartmentClick: (department: Data) => void;
}> = ({ department, onDepartmentClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const totalEmployees = department.employees.length;
    const onlineEmployees = department.employees.filter(
        (emp) => emp.online === 1
    ).length;
    const displayEmployees = department.employees.slice(0, 8);
    const remainingCount = Math.max(0, department.employees.length - 8);

    return (
        <div
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <button
                    className="absolute top-4 right-4 py-2 px-3 bg-[#3f739b] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDepartmentClick(department);
                    }}
                >
                    <ChevronRight size={25} />
                </button>
            )}

            <h3
                className="text-2xl font-bold text-gray-900 mb-3 hover:underline"
                onClick={(e) => {
                    e.stopPropagation();
                    onDepartmentClick(department);
                }}
            >
                {department.name}
            </h3>

            <div className="inline-block px-3 py-1 border border-green-700 bg-green-50 text-green-700 text-sm font-medium rounded-md mb-4">
                {department.type}
            </div>

            <div className="text-sm text-gray-600 mb-4 space-y-1">
                <div className="flex text-lg justify-between">
                    <span>Jami xodimlar:</span>
                    <span className="font-medium">{totalEmployees} nafar</span>
                </div>
                <div className="flex text-lg justify-between">
                    <span>Binoda:</span>
                    <span className="font-medium text-green-600">
                        {onlineEmployees} nafar
                    </span>
                </div>
            </div>

            <div className="flex -space-x-4 items-center">
                {displayEmployees.map((employee) => (
                    <div key={employee.id} className={`relative `}>
                        <div
                            className={`w-12 h-12 rounded-full overflow-hidden ${
                                employee.online === 1
                                    ? 'border-2 border-green-500'
                                    : 'border-2 border-red-500'
                            }`}
                        >
                            <img
                                src={
                                    `${API_URL}/storage/${employee.image}` ||
                                    defaultImage
                                }
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div className="relative z-0">
                        <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm font-medium text-gray-600">
                            +{remainingCount}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const DepartmentPage: React.FC = () => {
    usePageTimeout();
    const navigate = useNavigate();
    const { data } = useInnovationEmployeeQuery();
    const handleDepartmentClick = (department: Data) => {
        navigate(`/innovation/${department.id}/employees`);
    };

    return (
        <div className="mx-auto py-8 px-4">
            <div className="flex items-center justify-end mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 text-xl text-white bg-[#3f739b] rounded-md"
                >
                    Orqaga
                </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {data?.data.map((department) => (
                    <DepartmentCard
                        key={department.id}
                        department={department}
                        onDepartmentClick={handleDepartmentClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default DepartmentPage;
