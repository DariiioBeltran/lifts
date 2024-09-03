import {
    MuscleGroups,
    ExerciseScope,
    EquipmentCategory,
} from "../models/notionalExercise.model";

export const FormattedMuslceGroups = Object.freeze([
    {
        label: "Shoulders",
        value: MuscleGroups.SHOULDERS,
    },
    {
        label: "Back",
        value: MuscleGroups.BACK,
    },
    {
        label: "Chest",
        value: MuscleGroups.CHEST,
    },
    {
        label: "Arms",
        value: MuscleGroups.ARMS,
    },
    {
        label: "Legs",
        value: MuscleGroups.LEGS,
    },
    {
        label: "Core",
        value: MuscleGroups.CORE,
    },
])

export const FormattedExerciseScope = Object.freeze([
    {
        label: "Isolation",
        value: ExerciseScope.ISOLATION,
    },
    {
        label: "Compound",
        value: ExerciseScope.COMPOUND,
    },
])

export const FormattedEquipmentCategory = Object.freeze([
    {
        label: "Dumbell",
        value: EquipmentCategory.DUMBELL
    },
    {
        label: "Barbell",
        value: EquipmentCategory.BARBELL
    },
    {
        label: "Machine",
        value: EquipmentCategory.MACHINE
    },
    {
        label: "Cables",
        value: EquipmentCategory.CABLES
    },
    {
        label: "Kettlebell",
        value: EquipmentCategory.KETTLEBELL
    },
])

export const enum NavigationEnum {
    home = "",
    outlines = "outlines",
    exercises = "exercises",
    records = "records",
    profile = "profile",
    logout = "logout",
}