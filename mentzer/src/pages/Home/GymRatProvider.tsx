import { ReactNode, useState, useEffect } from 'react';
import { GYM_RAT_ID } from "../../constants/authConstants";
import { GymRatModel } from "../../models/gymRat.model";
import api from "../../api";
import { GymRatContext, GymRatContextType } from "./GymRatContext";


interface GymRatContextProviderProps {
    children?: ReactNode;
}

export function GymRatProvider(props: GymRatContextProviderProps) {
    const gymRatId = localStorage.getItem(GYM_RAT_ID);
    const [gymRat, setGymRat] = useState<GymRatModel | undefined>(undefined);

    // TODO: clean this up w/ a custom hook (see useGetAuth)
    useEffect(()=>{ 
        (async () => { 
            const resp = await api.get(`/gym_rats/${gymRatId}`)
            const gym_rat = new GymRatModel(resp.data)
            setGymRat(gym_rat)
        })() 
    },[])

    const value = {
        gymRatData: gymRat?.gymRatData,
        exercises: gymRat?.gymRatExercises,
        workoutOutlines: gymRat?.gymRatWorkoutOutlines,
    } as GymRatContextType;

    return <GymRatContext.Provider value={value}>{ props?.children }</GymRatContext.Provider>;
}
