import * as yup from "yup";

export const createOutlineFormSchema = yup.object().shape({
    workout_outline_name: yup.string().required("Required."),
    exercise_outlines: yup.array()
})