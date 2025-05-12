import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function usePageTimeout(duration = 10 * 60 * 1000) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/', { replace: true });
        }, duration);

        return () => clearTimeout(timer);
    }, [navigate, duration]);
}

export default usePageTimeout;
