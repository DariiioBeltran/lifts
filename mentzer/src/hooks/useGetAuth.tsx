import { useState } from 'react';
import api from "../api";


export const postAuth = async (data: any, route: string) => {
    const res = await api.post(route, data);
    return res;
};

export const usePostAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async (data: any, route = "", method = "") => {
        try {
            setIsLoading(true);
            const res = await postAuth(data, route);
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
};
