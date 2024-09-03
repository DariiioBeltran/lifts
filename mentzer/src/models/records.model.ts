import { WorkoutOutline, ExerciseOutline } from "./gymRat.model"


export interface WorkoutRecord {
    id: number;
    workout_outline: WorkoutOutline;
    set_records: SetRecord[];
    created_at: Date;
}

export interface SetRecord {
    id: number;
    workout_record: WorkoutRecord;
    exercise_outline: ExerciseOutline;
    weight: number;
    reps_completed: number;
    volume: number;
    skipped: boolean;
    created_at: Date;
}
