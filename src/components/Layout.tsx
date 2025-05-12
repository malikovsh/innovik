import React from 'react';
import { Outlet } from 'react-router-dom';
import innovation from '../assets/logo/innovationLogo.svg';
import gerb from '../assets/logo/gerbLogo.png';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={innovation}
                            alt="Logo"
                            className="w-40 h-40 object-contain"
                        />
                    </div>
                    <h1 className="text-4xl font-serif text-[#3f739b] text-center">
                        INNOVATSION RIVOJLANISH AGENTLIGI
                    </h1>
                    <div className="flex items-center gap-4">
                        <img
                            src={gerb}
                            alt="Emblem"
                            className="w-40 h-40 object-contain"
                        />
                    </div>
                </div>
            </header>
            <main className=" mx-auto py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
