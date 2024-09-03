import { useContext, createContext } from "react";
import { NotionalExercise } from "../../models/notionalExercise.model";


export interface OutlinesContextType {
    exercises: NotionalExercise[];
}

export const OutlinesContext = createContext<OutlinesContextType>({} as OutlinesContextType);

export const useOutlinesContext = () => {
    return useContext(OutlinesContext)
}
