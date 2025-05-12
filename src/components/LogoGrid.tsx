import { useNavigate } from 'react-router-dom';
import education from '../assets/logo/education.png';
import innovation from '../assets/logo/innovationLogo.svg';
import markaz from '../assets/logo/markazLogo.png';
import milliy from '../assets/logo/milliyLogo.png';
import ekonomy from '../assets/logo/ekonomyLog.png';
import yoshlar from '../assets/logo/yoshlarLogo.png';

const LogoGrid = () => {
    const navigate = useNavigate();
    const logos = [
        {
            src: education,
            alt: "Oliy ta'lim",
            path: '',
        },
        {
            src: innovation,
            alt: 'Innovatsion rivojlanish',
            path: '/innovation',
        },
        {
            src: markaz,
            alt: 'Yoshlar akademiyasi',
            path: '',
        },
        {
            src: milliy,
            alt: 'Fan-texnik',
            path: '',
        },
        {
            src: ekonomy,
            alt: 'Ilmiy faoliyat',
            path: '',
        },
        {
            src: yoshlar,
            alt: 'Vazirlik',
            path: '',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-serif text-[#3f739b] text-center mb-12">
                O'ZBEKISTON RESPUBLIKASI OLIY TA'LIM, FAN VA INNOVATSIYALAR
                VAZIRLIGI
            </h1>

            <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mt-40">
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="aspect-square bg-white w-64 h-64 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                        onClick={() => navigate(logo.path)}
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="w-full h-full object-contain p-6"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoGrid;
