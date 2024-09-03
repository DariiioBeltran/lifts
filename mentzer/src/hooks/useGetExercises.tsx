import { useState } from 'react';
import api from "../api";

export const getExercises = async () => {
    const res = await api.get("/notional_exercise/");
    return res;
};

export const useGetExercises = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async () => {
        try {
            setIsLoading(true);
            const res = await getExercises();
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
