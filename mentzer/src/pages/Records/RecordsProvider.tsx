import { ReactNode, useState, useEffect } from 'react';
import { WorkoutRecord } from "../../models/records.model";
import { RecordsContextType, RecordsContext } from "./RecordsContext";
import { useGetWorkoutRecords } from "../../hooks/useGetWorkoutRecord";

interface RecordsContextProviderProps {
    children?: ReactNode;
}

export function RecordsProvider({ children }: RecordsContextProviderProps) {
    const {
        isLoading,
        error,
        data,
        execute,
    } = useGetWorkoutRecords();
    const [records, setRecords] = useState<WorkoutRecord[] | undefined>(undefined);

    useEffect(()=>{
        (async () => {
            try {
                const res = await execute();
                const recs = res.data as WorkoutRecord[];
                setRecords(recs);
            } catch (error) {
                alert(error);
            }
        })()
    },[])

    const value = {
        records: records,
    } as RecordsContextType;

    return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>;
}
