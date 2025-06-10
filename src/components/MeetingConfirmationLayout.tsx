import React from 'react';
import { PendingApplicationsList } from './PendingApplicationsList';
import { ConfirmedMeetingsList } from './ConfirmedMeetingsList';
import { useOrdersQuery } from '../hooks/useOrdersQuery';
import video from '../assets/video.mp4';

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
        <div className="mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-4 min-h-screen col-span-1">
                    <div className="bg-white rounded-md overflow-hidden flex-1 flex flex-col border-[2px]">
                        <div className="px-6 py-4">
                            <h2 className="text-xl font-semibold">
                                Uchrashuv tasdiqlanmoqda
                            </h2>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto">
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
                    <div className="bg-white rounded-md overflow-hidden flex-1 flex flex-col border-[2px]">
                        <div className="px-6 py-4">
                            <h2 className="text-xl font-semibold">
                                Tasdiqlandi
                            </h2>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto">
                            <ConfirmedMeetingsList
                                pendingApplications={{
                                    data: confirmedApplications || [],
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center col-span-2">
                    <video
                        src={video}
                        controls
                        autoPlay
                        loop
                        muted
                        className="rounded-md shadow-md w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};
