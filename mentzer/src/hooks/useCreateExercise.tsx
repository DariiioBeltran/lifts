import { useState } from 'react';
import api from "../api";
import { MuscleGroups, ExerciseScope, EquipmentCategory } from "../models/notionalExercise.model";

export interface CreateExerciseRequest {
    gym_rat: Number;
    exercise_name: string;
    primary_muscle_group: MuscleGroups;
    secondary_muscle_groups: MuscleGroups[];
    exercise_scope: ExerciseScope;
    equipment_category: EquipmentCategory;
}

export const createExercise = async (data: CreateExerciseRequest) => {
    const res = await api.post("/notional_exercise/", data);
    return res;
};

export const useCreateExercise = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const execute = async (data: CreateExerciseRequest) => {
        try {
            setIsLoading(true);
            const res = await createExercise(data);
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
