import { useState } from 'react';
import api from "../api";

export interface SetRecordRequestData {
    exercise_outline_id: number;
    weight: number;
    reps_completed: number;
    skipped: boolean;
}

export interface WorkoutRecordRequestData {
    gym_rat: number;
    workout_outline_id: number;
    set_records: SetRecordRequestData[];
}

export const createWorkoutRecord = async (data: WorkoutRecordRequestData) => {
    const res = await api.post("/workout_records/", data);
    return res;
};

export const useCreateWorkoutRecord = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async (data: WorkoutRecordRequestData) => {
        try {
            setIsLoading(true);
            const res = await createWorkoutRecord(data);
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
