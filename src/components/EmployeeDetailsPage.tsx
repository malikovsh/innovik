import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Building, Phone } from 'lucide-react';
import defaultImage from '../assets/logo/defaultuser.webp';
import { useInnovationOneEmployee } from '../hooks/useInnovationOneEmployeeQuery';
import UserInfoForm from './UserInfoForm';
import { useDispatch } from 'react-redux';
import { setId } from '../store/formSlice';
import usePageTimeout from '../hooks/usePageTimeout';

const API_URL = import.meta.env.VITE_BASE_URI;

const EmployeeDetailsPage: React.FC = () => {
    usePageTimeout();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useInnovationOneEmployee(Number(id));

    const handleNext = () => {
        dispatch(setId(Number(id)));
        navigate('/camera');
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl text-center font-serif text-blue-800">
                        {data?.data.position} bilan uchrashuv tashkil qilish
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-xl text-white bg-blue-800 rounded-md"
                    >
                        Orqaga
                    </button>
                </div>

                <div className="bg-white rounded-lg p-6 shadow mb-3">
                    <div className="flex items-start gap-4 mb-4">
                        <img
                            src={
                                `${API_URL}/storage/${data?.data.image}` ||
                                defaultImage
                            }
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="text-2xl font-medium text-gray-900">
                                {data?.data.full_name}
                            </h3>
                            <p className="text-gray-500 text-lg font-medium">
                                {data?.data.position}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-lg">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={20} />
                            <a className="text-blue-600 hover:underline text-lg">
                                {data?.data.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-lg">
                            <Building size={20} className="text-gray-400" />
                            <span className="text-gray-600">
                                {data?.data.room_number}
                            </span>
                            <Phone size={20} className="text-gray-400 ml-4" />
                            <span className="text-gray-600">
                                {data?.data.room_phone}
                            </span>
                        </div>
                    </div>
                </div>

                <UserInfoForm handleNext={handleNext} />
            </div>
        </div>
    );
};

export default EmployeeDetailsPage;
