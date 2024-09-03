import TextField from '@mui/material/TextField';
import { useFormik } from "formik";

export interface OutlineNameProps {
    localSubmit: (values: any) => void;
    handleNext: () => void;
}

const OutlineName = ({ localSubmit, handleNext }: OutlineNameProps) => {
    const onSubmit = async (values: any, actions: any) => {
        localSubmit(values.workoutOutlineName)
        handleNext()
    }

    const {
        values,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            workoutOutlineName: "",
        },
        onSubmit,
    });

    return (
        <form id="form-step0" onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                label="Workout Name"
                variant="outlined"
                type="text"
                name="workoutOutlineName"
                value={values.workoutOutlineName}
                onChange={handleChange}
                style={{ width: "100%"}}
            />
        </form>
    )
}

export default OutlineName;