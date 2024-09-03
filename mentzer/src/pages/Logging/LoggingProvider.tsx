import { ReactNode, useState, useEffect } from 'react';
import { WorkoutOutline } from "../../models/gymRat.model";
import { LoggingContextType, LoggingContext } from "./LoggingContext"
import { useGetOutlines } from "../../hooks/useGetOutlines";

interface LoggingContextProviderProps {
    id: number;
    children?: ReactNode;
}

export function LoggingProvider({ id, children }: LoggingContextProviderProps) {
    const {
        isLoading,
        error,
        data,
        execute,
    } = useGetOutlines();
    const [outline, setOutline] = useState<WorkoutOutline | undefined>(undefined);

    useEffect(()=>{
        (async () => {
            try {
                const res = await execute(id)
                const outline = res.data as WorkoutOutline
                setOutline(outline)
            } catch (error) {
                alert(error);
            }
        })()
    },[])

    const value = {
        outline: outline,
    } as LoggingContextType;

    return <LoggingContext.Provider value={value}>{children}</LoggingContext.Provider>;
}
