import { useContext, createContext } from "react";
import { WorkoutOutline } from "../../models/gymRat.model";


export interface LoggingContextType {
    outline: WorkoutOutline;
}

export const LoggingContext = createContext<LoggingContextType>({} as LoggingContextType);

export const useLoggingContext = () => {
    return useContext(LoggingContext)
}
