import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QRCodeCanvas } from 'qrcode.react';
import { setScienceId } from '../store/formSlice';
import type { RootState } from '../store/store';

interface UserInfoFormProps {
    className?: string;
    handleNext?: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
    className = '',
    handleNext,
}) => {
    const dispatch = useDispatch();
    const { scienceId } = useSelector((state: RootState) => state.form);
    const [isValid, setIsValid] = useState(false);

    const formatScienceId = (value: string): string => {
        const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

        const letters = cleaned.slice(0, 3);
        const middle = cleaned.slice(3, 7);
        const end = cleaned.slice(7, 11);

        let formatted = letters;
        if (middle) formatted += `-${middle}`;
        if (end) formatted += `-${end}`;

        return formatted;
    };

    const handleScienceIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatScienceId(e.target.value);
        dispatch(setScienceId(formatted));
    };

    useEffect(() => {
        const scienceIdRegex = /^[A-Z]{3}-\d{4}-\d{4}$/;
        const isScienceIdValid = scienceIdRegex.test(scienceId);

        setIsValid(isScienceIdValid);
    }, [scienceId]);

    return (
        <div className={`bg-white rounded-lg p-6 shadow ${className}`}>
            <h3 className="text-2xl text-center font-medium text-gray-900 mb-6">
                Ma'lumotlaringizni kiriting
            </h3>

            <div className="flex items-center justify-center mb-6 gap-10">
                <div className="flex items-center gap-2 text-xl">
                    <div className="text-gray-800 text-xl">ScienceID:</div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={scienceId}
                            onChange={handleScienceIdChange}
                            placeholder="XXX-XXXX-XXXX"
                            className="flex-1 px-4 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all text-xl uppercase"
                            maxLength={14}
                        />
                    </div>
                </div>
                <button
                    className={`px-8 py-2 rounded transition-all ${
                        isValid
                            ? 'bg-blue-800 text-white cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => {
                        if (isValid && handleNext) {
                            handleNext();
                        }
                    }}
                    disabled={!isValid}
                >
                    Tasdiqlang
                </button>
            </div>

            <div className="flex items-start justify-start pt-4">
                <div className="flex flex-col items- mb-4 gap-2">
                    <span className="text-gray-800 font-semibold text-xl mb-2">
                        ScienceID raqamingiz yo'qmi?
                    </span>
                    <QRCodeCanvas
                        value="https://id.ilmiy.uz"
                        size={80}
                        className="ml-5"
                    />
                    <span className="text-gray-800 text-lg mb-2">
                        U holda <b>Id.ilmiy.uz</b> sahifasi orqali ro’yxatdan
                        o’ting <br /> yoki telefoningizdan Qr kodni scaner
                        qilish orqali royxatdan o’ting.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserInfoForm;
