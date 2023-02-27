import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthProtection = () => {
    const navigate = useNavigate();

    const id = document.cookie
        .split('; ')
        .filter(cookie => cookie.startsWith('login='))
        .map(cookie => cookie.slice(6))[0];

    useEffect(() => {
        !id && navigate('/');
    }, [id, navigate]);
};

export default useAuthProtection;
