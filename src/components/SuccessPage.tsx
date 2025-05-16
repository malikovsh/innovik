import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import usePageTimeout from '../hooks/usePageTimeout';

const SuccessPage: React.FC = () => {
    usePageTimeout();
    const navigate = useNavigate();
    const { id, m_fish, position, structure, user_fish } = useSelector(
        (state: RootState) => state.application
    );

    const handleBack = () => {
        navigate('/');
        window.location.reload();
    };
    return (
        <div className="max-w-[1300px] mx-auto mt-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif text-blue-800">
                        Uchrashuv tasdiqlash uchun so’rov yuborildi
                    </h1>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 text-xl text-white bg-blue-800 rounded-md"
                    >
                        Bosh sahifaga
                    </button>
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 ">
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <span className="font-medium text-2xl">
                                {structure} {position.toLocaleLowerCase()}:
                            </span>
                            <span className="text-blue-800 text-2xl">
                                {user_fish.split(' ').slice(0, 2).join(' ')}
                            </span>
                        </div>

                        {/* <div className="flex gap-2">
                            <span className="font-medium">
                                Uchrashuv vaqti:
                            </span>
                            <span className="text-blue-800">
                                so'rov jonatildi
                            </span>
                        </div> */}

                        {/* <div className="flex gap-2">
                            <span className="font-medium">
                                Uchrashuvni xonasi:
                            </span>
                            <span className="text-blue-800">307-xona</span>
                        </div> */}

                        <div className="flex gap-2 pt-4">
                            <span className="font-medium text-2xl">
                                Murojatchi:
                            </span>
                            <span className="text-blue-800 text-2xl">
                                {m_fish.split(' ').slice(0, 2).join(' ')}
                            </span>
                        </div>

                        <div className="mt-16 flex items-end gap-2 justify-center text-2xl">
                            <div className="font-medium">
                                Murojaat raqamingiz:
                            </div>
                            <div className="font-bold text-blue-800 text-3xl">
                                {id}
                            </div>
                        </div>

                        <div className="text-center mt-4 text-xl">
                            <span className="underline">
                                Sizga SMS xabarnoma yuborildi!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
