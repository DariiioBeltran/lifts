import { useState } from 'react';
import api from "../api";


export interface ExerciseOutlineRequest {
    notional_exercise_id: number;
    number_of_sets: number;
    number_of_reps: number;
}

export interface CreateOutlineRequest {
    gym_rat: number;
    workout_outline_name: string;
    exercise_outlines: ExerciseOutlineRequest[]
}

export const createOutline = async (data: CreateOutlineRequest) => {
    const res = await api.post("/workout_outlines/", data);
    return res;
};

export const useCreateOutline = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async (data: CreateOutlineRequest) => {
        try {
            setIsLoading(true);
            const res = await createOutline(data);
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
