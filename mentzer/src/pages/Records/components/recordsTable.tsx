import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { useState } from "react";
import { WorkoutRecord,  } from "../../../models/records.model";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useRecordsContext } from "../RecordsContext";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";


interface RecordsRowProps {
    record: WorkoutRecord;
}

const RecordsRow = ({ record }: RecordsRowProps) => {
    if (!record) { return null; }
    const [open, setOpen] = useState(false);
  
    return (
        <>
            <TableRow sx={{ borderBottom: 'unset', background: "black" }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        color="primary"
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography color="textPrimary">
                        {record.workout_outline.workout_outline_name}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: "black" }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" color="textPrimary">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body1" color="textPrimary">
                                                Set
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" color="textPrimary">
                                                Exercise
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" color="textPrimary">
                                                Weight
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" color="textPrimary">
                                            Reps
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {record.set_records.map((set, index) => {
                                        let color = (set.reps_completed >= set.exercise_outline.number_of_reps) ? "green" : "red";
                                        return (
                                            <TableRow key={`setID-${set.id}-index-${index}`}>
                                                <TableCell component="th" scope="row">
                                                    <Typography variant="body2" color={color}>
                                                        {index+1}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Typography variant="body2" color={color}>
                                                        {set.exercise_outline.notional_exercise.exercise_name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color={color}>
                                                    {set.weight}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color={color}>
                                                        {set.reps_completed}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const RecordsTable = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const workoutRecords = useRecordsContext();
    if (!workoutRecords.records) { return null; }

    return (
        <Box
            display="flex"
            flexDirection="column"
            py={2}
            px={2}
            mx={isSmall ? 2 : 6}
            sx={{ 
                background: "black", 
                overflow: "hidden",
                marginTop: 2,
                marginBottom: 6,
                border: 1,
                borderColor: theme.palette.primary.main,
                borderRadius: 2
            }}
        >
            <Box display="flex" flexDirection="row" justifyContent="center" sx={{ borderBottom: 1 }}>
                <Typography variant="h4" color="textPrimary">
                    Last Two Weeks
                </Typography>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: "auto"
                }}
            >
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableBody>
                            {workoutRecords.records.map((record, index) => (
                                <RecordsRow key={`recordId-${record.id}-index-${index}`} record={record} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default RecordsTable;