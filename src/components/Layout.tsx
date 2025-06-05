import React from 'react';
import { Outlet } from 'react-router-dom';
import innovation from '../assets/logo/innovationLogo.svg';
import gerb from '../assets/logo/gerbLogo.png';
import bgImage from '../assets/bgImage.webp';

const Layout: React.FC = () => {
    return (
        <div
            className="min-h-screen relative"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="absolute inset-0 bg-white/50 z-0" />
            <div className="relative z-10">
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={innovation}
                                alt="Logo"
                                className="w-32 h-32 object-contain"
                            />
                        </div>
                        <h1 className="text-4xl font-serif text-blue-800 text-center">
                            INNOVATSION RIVOJLANISH AGENTLIGI
                        </h1>
                        <div className="flex items-center gap-4">
                            <img
                                src={gerb}
                                alt="Emblem"
                                className="w-28 h-28 object-contain"
                            />
                        </div>
                    </div>
                </header>
                <main className="mx-auto h-[calc(100vh-9rem)] overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
