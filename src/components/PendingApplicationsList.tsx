import React from 'react';
import { Clock, XCircle } from 'lucide-react';
import { AllOrdersType } from '../types/ordersType';

interface PendingApplicationsListProps {
    pendingApplications: AllOrdersType;
}

export const PendingApplicationsList: React.FC<
    PendingApplicationsListProps
> = ({ pendingApplications }) => {
    if (!pendingApplications.data || pendingApplications.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Clock size={48} className="mb-3 opacity-50" />
                <p className="text-lg font-medium">Hozirda arizalar yo'q</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <ul>
                {pendingApplications.data.map((application) => (
                    <li
                        key={application.id}
                        className="border-b border-gray-100 last:border-0 py-4 group"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-2xl font-bold">
                                <div
                                    className={` ${
                                        application.status === 'new'
                                            ? 'text-amber-500'
                                            : 'text-red-500'
                                    }`}
                                >
                                    {application.id}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                {application.status === 'new' ? (
                                    <>
                                        <Clock
                                            size={16}
                                            className="text-amber-500"
                                        />
                                        <span>Kutilmoqda</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle
                                            size={16}
                                            className="text-red-500"
                                        />
                                        <span>Rad etildi</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
