import { useCreateExercise, CreateExerciseRequest } from "../../../hooks/useCreateExercise";
import { GYM_RAT_ID } from "../../../constants/authConstants";
import {
    FormattedMuslceGroups,
    FormattedExerciseScope,
    FormattedEquipmentCategory,
} from "../../../constants/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export interface CreateExerciseFormProps {
    updateModalState: () => void;
}

const CreateExerciseForm = ({ updateModalState }: CreateExerciseFormProps) => {
    const {
        isLoading,
        error,
        data,
        execute,
    } = useCreateExercise();

    const [inputData, setInputData] = useState<any>({});
    const [smgChecked, setSmgChecked] = useState<any>(
        FormattedMuslceGroups.reduce((acc, cur) => ({ ...acc, [cur.value]: false }), {})
    );
    const navigate = useNavigate();

    const handleSmgChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.currentTarget.name
        const toggledValue = !smgChecked[name]
        setSmgChecked({
            ...smgChecked,
            ...{[event.currentTarget.name]: toggledValue}
        })
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setInputData((values: any) => ({...values, [name]: value}))
    }

    const formatRequestFromFormData = (inputData: any): CreateExerciseRequest => {
        const smgArray = Object.entries(smgChecked)
            .filter((smg) => smg[1])
            .map((smg) => smg[0])

        return {
            gym_rat: parseInt(localStorage.getItem(GYM_RAT_ID) || "0"),
            exercise_name: inputData.exerciseName,
            primary_muscle_group: inputData.primaryMuscleGroup,
            secondary_muscle_groups: smgArray,
            exercise_scope: inputData.exerciseScope,
            equipment_category: inputData.equipmentCategory,
        } as CreateExerciseRequest;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const req = formatRequestFromFormData(inputData)
            const res = await execute(req)
            updateModalState()
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ py: 2 }}>
                    <h1 style={{ textAlign: "center" }}>Create Exercise</h1>
                    <Divider />
                    <Container>
                    <TextField 
                        id="outlined-basic" 
                        label="Exercise Name" 
                        variant="outlined" 
                        type="text"
                        name="exerciseName"
                        value={inputData.exerciseName || ""}
                        onChange={handleChange}
                        sx={{ width: "100%", pb: 1 }}
                    />

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={6}>
                            <FormLabel key="primary-muscle-groups">Primary Muscle Groups</FormLabel>
                            <RadioGroup
                                name="primaryMuscleGroup"
                                onChange={handleChange} 
                            >
                                {FormattedMuslceGroups.map((pmg) => {
                                    return (
                                        <FormControlLabel 
                                            value={pmg.value}
                                            control={<Radio />} 
                                            label={pmg.label}
                                            key={`primaryMuscleGroup-${pmg.label}`}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel key="secondary-muscle-groups">Secondary Muscle Groups</FormLabel>
                            <FormGroup>
                                {FormattedMuslceGroups.map((smg, idx) => {
                                    return (
                                        <FormControlLabel 
                                            control={<Checkbox 
                                                onChange={handleSmgChange} 
                                                name={smg.value}
                                            />}
                                            label={smg.label}
                                            key={`secondaryMuscleGroup-${smg.label}`}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <FormLabel key="exercise-scope">Exercise Scope</FormLabel>
                    <RadioGroup
                        row
                        name="exerciseScope"
                        onChange={handleChange}
                    >
                        {FormattedExerciseScope.map((es) => {
                            return (
                                <FormControlLabel
                                    value={es.value}
                                    control={<Radio />} 
                                    label={es.label}
                                    key={`exerciseScope-${es.label}`}
                                />
                            )
                        })}
                    </RadioGroup>

                    <FormLabel key="equipment-category">Equipment Category</FormLabel>
                    <RadioGroup
                        row
                        name="equipmentCategory"
                        onChange={handleChange}
                    >
                        {FormattedEquipmentCategory.map((ec) => {
                            return (
                                <FormControlLabel 
                                    value={ec.value}
                                    control={<Radio />} 
                                    label={ec.label}
                                    key={`equipmentCategory-${ec.label}`}
                                />
                            )
                        })}
                    </RadioGroup>
                    </Container>

                    <Divider />
                    <Container>
                        <Button 
                            variant="outlined" 
                            type="submit" 
                            color="secondary"
                            sx={{ width: "100%" }}
                        >
                            Create Exercise
                        </Button>
                    </Container>
                </Stack>
            </form>
        </Box>
    )
}

export default CreateExerciseForm;