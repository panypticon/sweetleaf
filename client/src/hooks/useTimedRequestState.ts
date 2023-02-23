import { useState, useEffect, useMemo } from 'react';

import type { Dispatch, SetStateAction } from 'react';

interface TimedRequestState {
    success: boolean;
    error: boolean;
}

const useTimedRequestState = (): [TimedRequestState, Dispatch<SetStateAction<TimedRequestState>>] => {
    const initialState = useMemo(() => ({ success: false, error: false }), []) as TimedRequestState;
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const timer = setTimeout(() => setState(initialState), 1500);
        return () => clearTimeout(timer);
    }, [state, initialState]);

    return [state, setState];
};

export default useTimedRequestState;
