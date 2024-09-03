import { ReactNode, useState, useEffect } from 'react';
import { SetRecord } from "../../models/records.model";
import { StatsContextType, StatsContext } from "./StatsContext"
import { useGetExerciseStats } from "../../hooks/useGetExerciseStats";

interface StatsContextProviderProps {
    notionalExerciseId: number;
    children?: ReactNode;
}

export function StatsProvider({ notionalExerciseId, children }: StatsContextProviderProps) {
    const {
        isLoading,
        error,
        data,
        execute,
    } = useGetExerciseStats();
    const [stats, setStats] = useState<SetRecord[] | undefined>(undefined);

    useEffect(()=>{ 
        (async () => { 
            try {
                const res = await execute(notionalExerciseId)
                const stats = res.data as SetRecord[]
                setStats(stats)
            } catch (error) {
                alert(error);
            }
        })() 
    },[])

    const value = {
        setRecords: stats,
    } as StatsContextType;

    return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}