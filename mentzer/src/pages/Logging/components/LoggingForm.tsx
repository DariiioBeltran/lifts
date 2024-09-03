import { useLoggingContext } from "../LoggingContext";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ExerciseOutline, WorkoutOutline } from "../../../models/gymRat.model";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GYM_RAT_ID } from '../../../constants/authConstants';
import { useNavigate } from "react-router-dom";
import { useCreateWorkoutRecord, SetRecordRequestData, WorkoutRecordRequestData } from "../../../hooks/useCreateWorkoutRecord";
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, useTheme } from "@mui/material";

interface SetRecordFormData {
    exerciseId: number;
    reps: number | string;
    weight: number | string;
    skipped: boolean;
}

interface ExerciseOutlineFormData {
    name: string;
    [key: number]: SetRecordFormData;
}

interface LoggingFormProps {
    outline: WorkoutOutline
}

const LoggingForm = ({ outline }: LoggingFormProps) => {
    const theme = useTheme();

    if (!outline) { return null; }
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        data,
        execute,
    } = useCreateWorkoutRecord();

    const mapExerciseOutlineToFormInitialValues = (exerciseOutline: ExerciseOutline): ExerciseOutlineFormData => {
        let exerciseInitialValues = {
            name: exerciseOutline.notional_exercise.exercise_name
        } as ExerciseOutlineFormData;

        for (let i = 0; i < exerciseOutline.number_of_sets; i++) {
            exerciseInitialValues[i] = {
                exerciseId: exerciseOutline.id,
                reps: "",
                weight: "",
                skipped: false,
            } as SetRecordFormData
        }
        return exerciseInitialValues;
    }

    const formatLogWorkoutRecordRequest = (values: any): WorkoutRecordRequestData => {
        let setRecords: SetRecordRequestData[] = []
        for (const set of values.exercises) {
            const { name, ...sets } = set
            setRecords = setRecords.concat(Object.values(sets).filter((s: any) => !s.skipped).map((s: any) => {
                return {
                    exercise_outline_id: s.exerciseId,
                    weight: s.weight,
                    reps_completed: s.reps,
                    skipped: s.skipped == "" ? false : true,
                } as SetRecordRequestData;
            }))
        }

        return {
            gym_rat: parseInt(localStorage.getItem(GYM_RAT_ID) || "0"),
            workout_outline_id: outline.id,
            set_records: setRecords,
        } as WorkoutRecordRequestData;
    }

    const onSubmit = async (values: any, actions: any) => {
        try {
            const req = formatLogWorkoutRecordRequest(values)
            const res = await execute(req)
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        setValues,
        setFieldValue,
        handleSubmit,
        } = useFormik({
        initialValues: {
            exercises: outline.exercise_outlines.map((e) => mapExerciseOutlineToFormInitialValues(e))
        },
        // validationSchema: ,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack 
                spacing={2}
                px={2}
                py={2}
                mx={2}
                sx={{
                    border: 1,
                    borderColor: theme.palette.primary.main,
                    borderRadius: 2
                }}
            >
                <Typography variant="h3" sx={{ width: "fit-content" }} color="primary">
                    {outline?.workout_outline_name}
                </Typography>
                {(outline?.exercise_outlines || []).map((outline, index) => {
                    return (
                        <Box sx={{ padding: 1 }} key={`box-${index}`}>
                            <Typography variant="h5" sx={{ width: "fit-content" }} color="primary">
                                {outline.notional_exercise.exercise_name}
                            </Typography>
                            <Stack>
                                {[...Array(outline.number_of_sets).keys()].map((set, idx) => {
                                    return (
                                        <Box
                                            key={`outlineBox-${index}-${idx}`}
                                            sx={{
                                                display: 'row',
                                                flexDirection: 'column',
                                                py: 2,
                                            }}
                                        >
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                label="Weight"
                                                name={`exercises.${index}.${idx}.weight`}
                                                value={values.exercises[index][idx].weight}
                                                onChange={handleChange}
                                            />
                                            
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                label="Reps"
                                                name={`exercises.${index}.${idx}.reps`}
                                                value={values.exercises[index][idx].reps}
                                                onChange={handleChange}
                                            />

                                            <FormControlLabel 
                                                control={
                                                    <Checkbox 
                                                        value={"skipped"}
                                                        checked={values.exercises[index][idx].skipped}
                                                        onChange={() => setFieldValue(`exercises.${index}.${idx}.skipped`, !values.exercises[index][idx].skipped)}
                                                        sx={{ 
                                                            color: theme.palette.primary.main
                                                        }} 
                                                    />
                                                } 
                                                label="Skipped?"
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            />
                                        </Box>
                                    )
                                })}
                            </Stack>
                        </Box>
                    )
                })}

                {/* Submit Form */}
                <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    sx={{
                        width: "100%",
                        mb: 2
                    }}
                >
                    DONE!
                </Button>
            </Stack>
        </form>
    )
}

const LoggingFormContainer = () => {
    const { outline } = useLoggingContext();
    if (!outline) { return null; }
    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
            marginBottom="20px"
        >
            {outline && <LoggingForm outline={outline} />}
        </Box>
    )
}

export default LoggingFormContainer;