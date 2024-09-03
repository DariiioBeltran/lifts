import { useState } from 'react';
import api from "../api";

export const getOutlines = async (id?: number) => {
    const url = id ? `/workout_outlines/${id}` : "/workout_outlines/"
    const res = await api.get(url);
    return res;
};

export const useGetOutlines = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async (id?: number) => {
        try {
            setIsLoading(true);
            const res = await getOutlines(id);
            setData(res);
            return res;
        } catch (e) {
            setError(e);
            setIsLoading(false);
            throw e;
        }
    };

    return {
        isLoading,
        error,
        data,
        execute,
    };
}
