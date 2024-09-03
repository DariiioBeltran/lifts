import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { NotionalExercise } from '../../../models/notionalExercise.model';
import { useFormik } from "formik";

export interface SelectExercisesProps {
    exercises: NotionalExercise[];
    localSubmit: (values: any) => void;
    handleNext: () => void;
}

const SelectExercises = ({ exercises, localSubmit, handleNext }: SelectExercisesProps) => {
    const onSubmit = (values: any, actions: any) => {
        localSubmit(values.selectedExercises as NotionalExercise[])
        handleNext()
    }

    const {
        values,
        setFieldValue,
        handleSubmit,
    } = useFormik({
        initialValues: {
            selectedExercises: [],
        },
        onSubmit,
    });

    return (
        <form id="form-step1" onSubmit={handleSubmit}>
            {exercises && 
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={exercises}
                    getOptionLabel={(option) => option.exercise_name}
                    value={values.selectedExercises}
                    onChange={(event, value) => setFieldValue('selectedExercises', value)}
                    renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.exercise_name}>
                            {option.exercise_name}
                          </li>
                        );
                    }}
                    renderTags={(tagValue, getTagProps) => {
                        return tagValue.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option.exercise_name} label={option.exercise_name} />
                        ))
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Multiple values"
                            placeholder="Exercises"
                        />
                    )}
                />
            }
        </form>
    );
}

export default SelectExercises;