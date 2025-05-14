import React from 'react';
import { PendingApplicationsList } from './PendingApplicationsList';
import { ConfirmedMeetingsList } from './ConfirmedMeetingsList';
import { useOrdersQuery } from '../hooks/useOrdersQuery';

export const MeetingConfirmationLayout: React.FC = () => {
    const { data } = useOrdersQuery();

    const pendingApplications = data?.data.filter(
        (application) => application.status === 'new'
    );
    const rejectedApplications = data?.data.filter(
        (application) => application.status === 'rejected'
    );

    const confirmedApplications = data?.data.filter(
        (application) => application.status === 'accepted'
    );

    return (
        <div className="mx-auto px-4 py-8 max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-md shadow-md overflow-hidden transition-all duration-300">
                    <div className=" px-6 py-4">
                        <h2 className=" text-2xl font-semibold">
                            Uchrashuv Tasdiqlanmoqda
                        </h2>
                    </div>
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        <PendingApplicationsList
                            pendingApplications={{
                                data: [
                                    ...(pendingApplications || []),
                                    ...(rejectedApplications || []),
                                ],
                            }}
                        />
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md overflow-hidden transition-all duration-300">
                    <div className=" px-6 py-4">
                        <h2 className=" text-2xl font-semibold">Tasdiqlandi</h2>
                    </div>
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        <ConfirmedMeetingsList
                            pendingApplications={{
                                data: confirmedApplications || [],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
