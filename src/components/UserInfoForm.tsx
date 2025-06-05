import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QRCodeCanvas } from 'qrcode.react';
import { setScienceId, setProblem } from '../store/formSlice';
import type { RootState } from '../store/store';

interface UserInfoFormProps {
    className?: string;
    handleNext?: () => void;
}

const DescriptionModal: React.FC<{
    open: boolean;
    onClose: () => void;
    onSave: (desc: string) => void;
    initialValue?: string;
}> = ({ open, onClose, onSave, initialValue = '' }) => {
    const [desc, setDesc] = useState(initialValue);

    useEffect(() => {
        if (open) setDesc(initialValue);
    }, [open, initialValue]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-[700px] shadow-lg">
                <h4 className="text-xl font-semibold mb-4">
                    Murojaatning qisqacha tavsifi
                </h4>
                <textarea
                    className="w-full border text-lg border-gray-300 rounded p-2 mb-4"
                    rows={4}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Murojaat mazmunini kiriting..."
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        Bekor qilish
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-800 text-white rounded"
                        onClick={() => {
                            onSave(desc);
                        }}
                        disabled={!desc.trim()}
                    >
                        Saqlash
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserInfoForm: React.FC<UserInfoFormProps> = ({
    className = '',
    handleNext,
}) => {
    const dispatch = useDispatch();
    const { scienceId, problem } = useSelector(
        (state: RootState) => state.form
    );
    const [isValid, setIsValid] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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

    const handleSaveDescription = (desc: string) => {
        dispatch(setProblem(desc));
        setModalOpen(false);
        if (handleNext) handleNext();
    };

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
                        if (isValid) {
                            setModalOpen(true);
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

            {/* Modal */}
            <DescriptionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveDescription}
                initialValue={problem}
            />
        </div>
    );
};

export default UserInfoForm;
