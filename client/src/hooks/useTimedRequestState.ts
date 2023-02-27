import { useState, useEffect, useMemo } from 'react';

import type { Dispatch, SetStateAction } from 'react';

interface TimedRequestState {
    success: boolean;
    error: boolean;
    status?: number;
}

const useTimedRequestState = (
    delay: number = 1500
): [TimedRequestState, Dispatch<SetStateAction<TimedRequestState>>] => {
    const initialState = useMemo(() => ({ success: false, error: false }), []) as TimedRequestState;
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const timer = setTimeout(() => setState(initialState), delay);
        return () => clearTimeout(timer);
    }, [state, initialState, delay]);

    return [state, setState];
};

export default useTimedRequestState;
