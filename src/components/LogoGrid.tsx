import { useNavigate } from 'react-router-dom';
import education from '../assets/logo/education.png';
import innovation from '../assets/logo/innovationLogo.svg';
import markaz from '../assets/logo/markazLogo.png';
import milliy from '../assets/logo/milliyLogo.png';
import ekonomy from '../assets/logo/ekonomyLog.png';
import yoshlar from '../assets/logo/yoshlarLogo.png';
import bgImage from '../assets/bgImage.webp';

const LogoGrid = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-7xl px-4 py-10 bg-white/50 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-serif text-blue-800 text-center mb-12">
                    O'ZBEKISTON RESPUBLIKASI OLIY TA'LIM, FAN VA INNOVATSIYALAR
                    VAZIRLIGI
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div
                        className="bg-white w-80 h-[340px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2"
                        onClick={() => navigate('/maintenance')}
                    >
                        <img
                            src={education}
                            alt="Oliy ta'lim, fan va innovatsiyalar vazirligi"
                            className="w-52 h-52 object-contain p-2"
                        />
                        <div className="mt-2 text-xl font-serif text-center text-blue-800 px-2">
                            Oliy ta'lim, fan <br /> va innovatsiyalar vazirligi
                        </div>
                    </div>
                    <div
                        className="bg-white w-80 h-[340px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2"
                        onClick={() => navigate('/innovation')}
                    >
                        <img
                            src={innovation}
                            alt="Innovatsion rivojlanish agentligi"
                            className="w-52 h-52 object-contain p-2"
                        />
                        <div className="mt-2 text-xl font-serif text-center text-blue-800 px-2">
                            Innovatsion rivojlanish <br /> agentligi
                        </div>
                    </div>
                    <div
                        className="bg-white w-80 h-[340px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2"
                        onClick={() => navigate('/maintenance')}
                    >
                        <img
                            src={markaz}
                            alt="Ilmiy-texnik axborot markazi"
                            className="w-52 h-52 object-contain p-2"
                        />
                        <div className="mt-2 text-xl font-serif text-center text-blue-800 px-2">
                            Ilmiy-texnik axborot <br /> markazi
                        </div>
                    </div>
                    <div
                        className="bg-white w-80 h-[340px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2"
                        onClick={() => navigate('/maintenance')}
                    >
                        <img
                            src={milliy}
                            alt="Innovatsiyalarni joriy qilish va texnologiyalar transferi milliy ofisi"
                            className="w-52 h-52 object-contain p-2"
                        />
                        <div className="mt-2 text-xl font-serif text-center text-blue-800 px-2">
                            Innovatsiyalarni joriy qilish <br /> va
                            texnologiyalar transferi milliy ofisi
                        </div>
                    </div>
                    <div
                        className="bg-white w-80 h-[340px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2 border"
                        onClick={() => navigate('/maintenance')}
                    >
                        <img
                            src={ekonomy}
                            alt="Ilm-fanni moliyalashtirish va innovatsiyalarni qoʻllab-quvvatlash jamgʻarmasi"
                            className="w-52 h-52 object-contain p-2"
                        />
                        <div className="mt-2 text-xl font-serif text-center text-blue-800 px-2">
                            Ilm-fanni moliyalashtirish <br /> va
                            innovatsiyalarni qoʻllab-quvvatlash jamgʻarmasi
                        </div>
                    </div>
                    <div
                        className="bg-white w-80 h-[340px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2 border"
                        onClick={() => navigate('/maintenance')}
                    >
                        <img
                            src={yoshlar}
                            alt="Yoshlar Akademiyasi"
                            className="w-60 h-60 object-contain p-2"
                        />
                        <div className="mt-2 text-xl font-serif text-center text-blue-800 px-2">
                            Yoshlar Akademiyasi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoGrid;
