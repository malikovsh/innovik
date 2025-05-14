import React from 'react';
import { useNavigate } from 'react-router-dom';

const MaintenancePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded-xl p-8 max-w-md text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Texnik ishlar olib borilmoqda
                </h1>
                <button
                    onClick={() => navigate('/')}
                    className="bg-[#3f739b] text-white px-6 py-2 rounded-md transition"
                >
                    Bosh sahifaga
                </button>
            </div>
        </div>
    );
};

export default MaintenancePage;
