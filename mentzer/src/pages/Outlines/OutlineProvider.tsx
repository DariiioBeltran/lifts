import { ReactNode, useState, useEffect } from 'react';
import { NotionalExercise } from "../../models/notionalExercise.model";
import { OutlinesContextType, OutlinesContext } from "./OutlinesContext"
import { useGetExercises } from "../../hooks/useGetExercises";

interface OutlineContextProviderProps {
    children?: ReactNode;
}

export function OutlineProvider({ children }: OutlineContextProviderProps) {
    const {
        isLoading,
        error,
        data,
        execute,
    } = useGetExercises();
    const [exercises, setExercises] = useState<NotionalExercise[] | undefined>(undefined);

    useEffect(()=>{ 
        (async () => { 
            try {
                const res = await execute()
                const exercises = res.data as NotionalExercise[]
                setExercises(exercises)
            } catch (error) {
                alert(error);
            }
        })() 
    },[])

    const value = {
        exercises: exercises,
    } as OutlinesContextType;

    return <OutlinesContext.Provider value={value}>{children}</OutlinesContext.Provider>;
}
