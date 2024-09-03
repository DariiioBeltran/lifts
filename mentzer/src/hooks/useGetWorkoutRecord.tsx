import { useState } from 'react';
import api from "../api";

export const getWorkoutRecords = async () => {
    const res = await api.get("/workout_records/");
    return res;
};

export const useGetWorkoutRecords = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async () => {
        try {
            setIsLoading(true);
            const res = await getWorkoutRecords();
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
