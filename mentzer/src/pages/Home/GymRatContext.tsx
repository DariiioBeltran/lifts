import { useContext, createContext } from "react";
import { GymRatData, WorkoutOutline } from "../../models/gymRat.model";
import { NotionalExercise } from "../../models/notionalExercise.model";


export interface GymRatContextType {
    gymRatData: GymRatData;
    exercises: NotionalExercise[];
    workoutOutlines: WorkoutOutline[];
}

export const GymRatContext = createContext<GymRatContextType>({} as GymRatContextType);

export const useGymRatContext = () => {
    return useContext(GymRatContext)
}
