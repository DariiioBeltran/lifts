import { NotionalExercise } from '../../../models/notionalExercise.model';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFormik } from "formik";
import { ExerciseOutlineRequest } from "../../../hooks/useCreateOutline";

export interface SetsAndRepsTableProps {
    selectedExercises: NotionalExercise[];
    localSubmit: (values: any) => void;
    handleNext: () => void;
}

const SetsAndRepsTable = ({ selectedExercises = [], localSubmit, handleNext }: SetsAndRepsTableProps) => {
    const onSubmit = async (values: any, actions: any) => {
        const sanitizedValues = selectedExercises.map((ex) => {
            return {
                notional_exercise_id: ex.id, 
                number_of_reps: values[`${ex.exercise_name}-reps`],
                number_of_sets: values[`${ex.exercise_name}-sets`],
            } as ExerciseOutlineRequest
        });

        localSubmit(sanitizedValues)
        handleNext()
    }

    const {
        values,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: selectedExercises.reduce((o, ex) => ({ ...o, [`${ex.exercise_name}-sets`]: "", [`${ex.exercise_name}-reps`]: ""}), {}),
        onSubmit,
    });

    return (
        <>
            {selectedExercises &&
                <form id="form-step2" onSubmit={handleSubmit}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Exercise Name</TableCell>
                                    <TableCell align="right">Number of Sets</TableCell>
                                    <TableCell align="right">Target Reps</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedExercises.map((row) => (
                                    <TableRow
                                        key={row.exercise_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.exercise_name}</TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="number"
                                                placeholder="Sets"
                                                name={`${row.exercise_name}-sets`}
                                                value={values[`${row.exercise_name}-sets` as unknown as keyof {}]}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="number"
                                                placeholder="Reps"
                                                name={`${row.exercise_name}-reps`}
                                                value={values[`${row.exercise_name}-reps` as unknown as keyof {}]}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </form>
            }
        </>
    );
}

export default SetsAndRepsTable;