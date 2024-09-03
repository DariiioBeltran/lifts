export enum MuscleGroups {
    SHOULDERS = "SHOULDERS",
    BACK = "BACK",
    CHEST = "CHEST",
    ARMS = "ARMS",
    LEGS = "LEGS",
    CORE = "CORE",
}

export enum ExerciseScope {
    ISOLATION = "ISOLATION",
    COMPOUND = "COMPOUND",
}

export enum EquipmentCategory {
    DUMBELL = "DUMBELL",
    BARBELL = "BARBELL",
    MACHINE = "MACHINE",
    CABLES = "CABLES",
    KETTLEBELL = "KETTLEBELL",
}

export interface NotionalExercise {
    id: Number;
    exercise_name: string;
    primary_muscle_group: MuscleGroups;
    secondary_muscle_groups?: MuscleGroups[];
    exercise_scope: ExerciseScope;
    equipment_category: EquipmentCategory;
}
