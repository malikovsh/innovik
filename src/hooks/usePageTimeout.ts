import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function usePageTimeout(duration = 3 * 60 * 1000) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/', { replace: true });
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }, duration);

        return () => clearTimeout(timer);
    }, [navigate, duration]);
}

export default usePageTimeout;
