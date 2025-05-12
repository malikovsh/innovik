import React from 'react';
import { Mail, Building, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../assets/logo/defaultuser.webp';
import { Employee } from '../types/InnovationType';

const API_URL = import.meta.env.VITE_BASE_URI;

const EmployeeCard: React.FC<Employee> = ({
    id,
    full_name,
    position,
    email,
    room_number,
    room_phone,
    image,
    online,
}) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/employee/${id}`)}
        >
            <div className="flex items-start gap-4 mb-4">
                <img
                    src={`${API_URL}/storage/${image}` || defaultImage}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                    <h3 className="text-2xl font-medium text-gray-900">
                        {full_name}
                    </h3>
                    <p className="text-gray-500 text-lg font-medium">
                        {position}
                    </p>
                </div>
                <div className="ml-auto">
                    <div
                        className={`w-3 h-3 rounded-full  ${
                            online ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    ></div>
                </div>
            </div>

            <div className="space-y-2 text-lg">
                <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={20} />
                    <a className="text-blue-600 hover:underline text-lg">
                        {email}
                    </a>
                </div>
                <div className="flex items-center gap-2 text-lg">
                    <Building size={20} className="text-gray-400" />
                    <span className="text-gray-600">{room_number}</span>
                    <Phone size={20} className="text-gray-400 ml-4" />
                    <span className="text-gray-600">{room_phone}</span>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
