import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneNumber, setScienceId } from '../store/formSlice';
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
    const { phoneNumber, scienceId } = useSelector(
        (state: RootState) => state.form
    );
    const [isValid, setIsValid] = useState(false);

    const formatPhoneNumber = (value: string): string => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 9) {
            return digits.replace(
                /(\d{2})(\d{3})?(\d{2})?(\d{2})?/,
                (_, p1, p2, p3, p4) => {
                    let formatted = p1 || '';
                    if (p2) formatted += ` ${p2}`;
                    if (p3) formatted += `-${p3}`;
                    if (p4) formatted += `-${p4}`;
                    return formatted;
                }
            );
        }
        return digits
            .slice(0, 9)
            .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2-$3-$4');
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        const formatted = formatPhoneNumber(value);
        dispatch(setPhoneNumber(formatted));
    };

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

        const isPhoneValid = phoneNumber.replace(/\D/g, '').length === 9;

        setIsValid(isPhoneValid && isScienceIdValid);
    }, [scienceId, phoneNumber]);

    return (
        <div className={`bg-white rounded-lg p-6 shadow ${className}`}>
            <h3 className="text-2xl text-center font-medium text-gray-900 mb-6">
                Ma'lumotlaringizni kiriting
            </h3>

            <div className="flex gap-4 mb-6 justify-between px-10 pt-4">
                <div className=" flex items-center gap-2 text-xl">
                    <div className="text-gray-800 ">Tel:</div>
                    <div className="flex gap-2">
                        <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-1 text-gray-600 font-medium select-none">
                            +998
                        </div>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            placeholder="99 999-99-99"
                            className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f739b] focus:border-[#3f739b] outline-none transition-all text-xl"
                            maxLength={11}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xl">
                    <div className="text-gray-800 text-xl">ScienceID:</div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={scienceId}
                            onChange={handleScienceIdChange}
                            placeholder="XXX-XXXX-XXXX"
                            className="flex-1 px-4 py-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3f739b] focus:border-[#3f739b] outline-none transition-all text-xl uppercase"
                            maxLength={14}
                        />
                    </div>
                </div>
            </div>

            {/* <div>
                <p className="text-xl text-gray-600 mb-2">
                    ScienceID mavjud bo'lmasa PNFLni kiriting:
                </p>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={pnfl}
                        onChange={handlePnflChange}
                        placeholder="PNFL (14 raqam)"
                        className="px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f739b] focus:border-[#3f739b] outline-none transition-all text-lg"
                        maxLength={14}
                    />
                </div>
            </div> */}

            <div className="flex justify-end mt-8">
                <button
                    className={`px-8 py-2 rounded transition-all ${
                        isValid
                            ? 'bg-[#3f739b] text-white cursor-pointer'
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
        </div>
    );
};

export default UserInfoForm;
