import { useContext, createContext } from "react";
import { WorkoutRecord } from "../../models/records.model";


export interface RecordsContextType {
    records: WorkoutRecord[];
}

export const RecordsContext = createContext<RecordsContextType>({} as RecordsContextType);

export const useRecordsContext = () => {
    return useContext(RecordsContext)
}
