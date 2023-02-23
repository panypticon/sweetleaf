import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { User } from '../types';

const useAuthProtection = (user: User | null) => {
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/');
    }, [user, navigate]);
};

export default useAuthProtection;
