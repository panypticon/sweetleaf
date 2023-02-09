import type { DetailedError } from '../types';

export const postJSONData = async (url: string, payload: any) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const error = new Error(String(res.status)) as DetailedError;
        error.details = await res.json();
        throw error;
    }
    return await res.json();
};

export const getJSONData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error = new Error(String(res.status));
        throw error;
    }
    return await res.json();
};
