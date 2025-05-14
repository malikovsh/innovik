import React from 'react';
import { AllOrdersType } from '../types/ordersType';
import { CalendarCheck } from 'lucide-react';

interface PendingApplicationsListProps {
    pendingApplications: AllOrdersType;
}

export const ConfirmedMeetingsList: React.FC<PendingApplicationsListProps> = ({
    pendingApplications,
}) => {
    if (!pendingApplications.data || pendingApplications.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <CalendarCheck size={48} className="mb-3 opacity-50" />
                <p className="text-lg font-medium">Hozirda uchrashuvlar yo'q</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <ul className="divide-y divide-gray-100">
                {pendingApplications.data.map((application) => (
                    <li
                        key={application.id}
                        className="py-4 group animate-fadeIn"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-600">
                                {application.id}
                            </span>
                            <div className="text-gray-700 text-xl flex items-center gap-8">
                                <span className="font-medium">
                                    Xona raqami: {application.room}
                                </span>
                                <span className="font-medium">
                                    Uchrashuv vaqti: {application.time}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
