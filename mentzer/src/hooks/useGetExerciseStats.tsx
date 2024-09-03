import { useState } from 'react';
import api from "../api";

export const getExerciseStats = async (id?: number) => {
    const res = await api.get(`/exercise_stats/${id}`);
    return res;
};

export const useGetExerciseStats = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async (id?: number) => {
        try {
            setIsLoading(true);
            const res = await getExerciseStats(id);
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
