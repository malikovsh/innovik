import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraOff, Settings } from 'lucide-react';
import { useSubmitForm } from '../hooks/useSubmitFormMutate';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import usePageTimeout from '../hooks/usePageTimeout';

const CameraPage: React.FC = () => {
    usePageTimeout();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const { mutate, isPending } = useSubmitForm();
    const { phoneNumber, scienceId, id } = useSelector(
        (state: RootState) => state.form
    );

    const checkCameraPermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({
                name: 'camera' as PermissionName,
            });

            switch (permissionStatus.state) {
                case 'granted':
                    setPermissionError(null);
                    startCamera();
                    break;
                case 'denied':
                    setPermissionError(
                        'Camera access is blocked. Please enable camera access in your browser settings to continue.'
                    );
                    break;
                case 'prompt':
                    try {
                        await startCamera();
                        setPermissionError(null);
                    } catch (error) {
                        setPermissionError(
                            'Please allow camera access when prompted to use this feature.'
                        );
                    }
                    break;
            }

            permissionStatus.addEventListener('change', () => {
                if (permissionStatus.state === 'granted') {
                    setPermissionError(null);
                    startCamera();
                } else if (permissionStatus.state === 'denied') {
                    setPermissionError(
                        'Camera access is blocked. Please enable camera access in your browser settings to continue.'
                    );
                    stopCamera();
                }
            });
        } catch (error) {
            console.error('Error checking camera permission:', error);
            setPermissionError(
                'Unable to check camera permissions. Please ensure your browser supports camera access.'
            );
        }
    };

    const startCamera = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: 'user',
                    aspectRatio: 3 / 4,
                    width: { ideal: 480 },
                    height: { ideal: 640 },
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setCameraActive(true);
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            if (err instanceof DOMException && err.name === 'NotAllowedError') {
                setPermissionError(
                    'Camera access was denied. Please enable camera access in your browser settings to continue.'
                );
            } else {
                setPermissionError(
                    'An error occurred while accessing the camera. Please check your camera connection and try again.'
                );
            }
            setCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setCameraActive(false);
    };

    const handleNavigateBack = () => {
        stopCamera();
        navigate(-1);
    };

    const capturePhoto = () => {
        if (videoRef.current && cameraActive) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                const imageDataUrl = canvas.toDataURL('image/jpeg');
                setImagePreview(imageDataUrl);
                stopCamera();
            }
        }
    };

    const retakePhoto = () => {
        setImagePreview(null);
        checkCameraPermission();
    };

    const handleFinish = async () => {
        if (!imagePreview) return;

        // Stop camera immediately
        stopCamera();

        try {
            const response = await fetch(imagePreview);
            const blob = await response.blob();
            const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

            mutate(
                {
                    image: file,
                    scienceid: scienceId,
                    phone: '998' + phoneNumber,
                    user_id: String(id),
                },
                {
                    onSuccess: () => {
                        navigate('/success');
                    },
                    onError: (error) => {
                        console.error('Error submitting form:', error);
                    },
                }
            );
        } catch (error) {
            console.error('Error converting image preview to file:', error);
        }
    };

    useEffect(() => {
        checkCameraPermission();
        return () => {
            stopCamera();
        };
    }, []);

    const renderPermissionError = () => (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex items-center">
                <CameraOff className="h-6 w-6 text-red-400 mr-3" />
                <div>
                    <h3 className="text-red-800 font-medium">
                        Camera Access Required
                    </h3>
                    <p className="text-red-700 mt-1">{permissionError}</p>
                    {navigator.userAgent.toLowerCase().includes('firefox') ? (
                        <p className="text-sm text-red-600 mt-2">
                            To enable camera: Click the camera icon in the
                            address bar → Remove block
                        </p>
                    ) : (
                        <p className="text-sm text-red-600 mt-2">
                            To enable camera: Click the lock/camera icon in the
                            address bar → Permissions → Camera → Allow
                        </p>
                    )}
                </div>
            </div>
            <button
                onClick={checkCameraPermission}
                className="mt-4 inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <Settings className="h-4 w-4 mr-2" />
                Try Again
            </button>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto mt-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-serif text-[#3f739b]">
                    Kameraga qarang
                </h1>
                <button
                    onClick={handleNavigateBack}
                    className="px-3 py-1.5 text-base text-white bg-[#3f739b] rounded-md"
                >
                    Orqaga
                </button>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-[480px] mx-auto aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative">
                    {permissionError ? (
                        renderPermissionError()
                    ) : imagePreview ? (
                        <div className="relative w-full h-full">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />
                            {cameraActive && (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[70%] h-[70%] border-4 border-white border-dashed  rounded-full opacity-70"></div>
                                    </div>
                                    <div className="absolute bottom-8 left-0 right-0 text-center">
                                        <p className="text-white text-lg font-medium bg-black bg-opacity-50 py-1 px-3 rounded-full inline-block">
                                            Iltimos yuzingizni doira ichiga
                                            joylang
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    {imagePreview ? (
                        <>
                            <button
                                className="px-6 py-1.5 text-sm bg-gray-500 text-white rounded"
                                onClick={retakePhoto}
                                disabled={isPending}
                            >
                                Qayta olish
                            </button>
                            <button
                                className={`px-6 py-1.5 text-sm text-white rounded ${
                                    isPending
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#3f739b]'
                                }`}
                                onClick={handleFinish}
                                disabled={isPending}
                            >
                                {isPending ? 'Yuborilmoqda...' : 'Tasdiqlang'}
                            </button>
                        </>
                    ) : (
                        <button
                            className="px-6 py-1.5 text-sm bg-[#3f739b] text-white rounded"
                            onClick={capturePhoto}
                            disabled={!cameraActive || !!permissionError}
                        >
                            Rasmga olish
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraPage;
