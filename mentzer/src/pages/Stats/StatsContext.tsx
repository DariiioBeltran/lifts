import { useContext, createContext } from "react";
import { SetRecord } from "../../models/records.model";


export interface StatsContextType {
    setRecords: SetRecord[];
}

export const StatsContext = createContext<StatsContextType>({} as StatsContextType);

export const useStatsContext = () => {
    return useContext(StatsContext)
}
