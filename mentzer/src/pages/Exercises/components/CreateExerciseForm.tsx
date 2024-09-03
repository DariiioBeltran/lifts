import { useFormik } from "formik";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useCreateExercise, CreateExerciseRequest } from "../../../hooks/useCreateExercise";
import {
    FormattedMuslceGroups,
    FormattedExerciseScope,
    FormattedEquipmentCategory,
} from "../../../constants/constants";
import { GYM_RAT_ID } from "../../../constants/authConstants";

const CreateOutlineFormContainer = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        data,
        execute,
    } = useCreateExercise();

    const formatRequestFromFormData = (values: any): CreateExerciseRequest => {
        return {
            gym_rat: parseInt(localStorage.getItem(GYM_RAT_ID) || "0"),
            exercise_name: values.exerciseName,
            primary_muscle_group: values.primaryMuscleGroup,
            secondary_muscle_groups: values.secondaryMuscleGroups,
            exercise_scope: values.exerciseScope,
            equipment_category: values.equipmentCategory,
        } as CreateExerciseRequest;
    }

    const handleCheckboxChange = (event: any) => {
        const { value, checked } = event.target;
        const { secondaryMuscleGroups } = values;

        if (checked) {
            setFieldValue('secondaryMuscleGroups', [...secondaryMuscleGroups, value]);
        } else {
            setFieldValue(
                'secondaryMuscleGroups',
                secondaryMuscleGroups.filter((group) => group !== value)
            );
        }
      };

    const onSubmit = async (values: any, actions: any) => {
        try {
            const req = formatRequestFromFormData(values)
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
            exerciseName: "",
            primaryMuscleGroup: "",
            secondaryMuscleGroups: [] as string[],
            exerciseScope: "",
            equipmentCategory: "",
        },
        onSubmit,
    });

    return (
        <Box 
            width="100%" 
            height="100%"
            display="flex"
            justifyContent="center"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
                sx={{
                    background: "black",
                    border: 1,
                    borderColor: theme.palette.primary.main,
                    borderRadius: 2,
                    width: "fit-content",
                    overflow: "auto",
                    overflowY: "scroll",
                    marginTop: 2,
                    marginBottom: 2,
                }}
                py={2}
                px={2}
                mx={2}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Box 
                            display="flex" 
                            justifyContent="center" 
                            sx={{ borderBottom: 1 }}
                        >
                            <Typography variant="h3" sx={{ width: "fit-content" }} color="primary">
                                Create Exercise
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                border: 1,
                                padding: 1
                            }}
                        >
                            <TextField
                                type="text"
                                variant="standard"
                                label="Exercise Name"
                                name="exerciseName"
                                value={values.exerciseName}
                                onChange={handleChange}
                                sx={{ 
                                    width: "100%",
                                    color: "white"
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                border: 1,
                                padding: 1,
                            }}
                        >
                            <FormLabel key="primary-muscle-groups">
                                <Typography variant="h6" sx={{ width: "fit-content" }} color="primary">
                                    Primary Muscle Groups
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                name="primaryMuscleGroup"
                                onChange={handleChange}
                                value={values.primaryMuscleGroup}
                            >
                                {FormattedMuslceGroups.map((pmg) => {
                                    return (
                                        <FormControlLabel 
                                            value={pmg.value}
                                            control={
                                                <Radio 
                                                    sx={{ 
                                                        color: theme.palette.primary.main
                                                    }} 
                                                />} 
                                            label={pmg.label}
                                            key={`primaryMuscleGroup-${pmg.label}`}
                                            sx={{
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </Box>

                        <Box
                            sx={{
                                border: 1,
                                padding: 1
                            }}
                        >
                            <FormLabel key="secondary-muscle-groups">
                                <Typography variant="h6" sx={{ width: "fit-content" }} color="primary">
                                    Secondary Muscle Groups
                                </Typography>
                            </FormLabel>
                            <FormGroup>
                                {FormattedMuslceGroups.map((smg, idx) => {
                                    return (
                                        <FormControlLabel 
                                            control={<Checkbox 
                                                value={smg.value}
                                                checked={values.secondaryMuscleGroups.includes(smg.value)}
                                                onChange={handleCheckboxChange}
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            />}
                                            label={smg.label}
                                            key={`secondaryMuscleGroup-${smg.label}`}
                                            sx={{
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </Box>

                        <Box
                            sx={{
                                border: 1,
                                padding: 1
                            }}
                        >
                            <FormLabel key="exercise-scope">
                                <Typography variant="h6" sx={{ width: "fit-content" }} color="primary">
                                    Exercise Scope
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                row
                                name="exerciseScope"
                                onChange={handleChange}
                            >
                                {FormattedExerciseScope.map((es) => {
                                    return (
                                        <FormControlLabel
                                            value={es.value}
                                            control={<Radio sx={{
                                                color: theme.palette.primary.main
                                            }} />} 
                                            label={es.label}
                                            key={`exerciseScope-${es.label}`}
                                            sx={{
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </Box>

                        <Box
                            sx={{
                                border: 1,
                                padding: 1
                            }}
                        >
                            <FormLabel key="equipment-category">
                                <Typography variant="h6" sx={{ width: "fit-content" }} color="primary">
                                    Equipment Category
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                row
                                name="equipmentCategory"
                                onChange={handleChange}
                            >
                                {FormattedEquipmentCategory.map((ec) => {
                                    return (
                                        <FormControlLabel 
                                            value={ec.value}
                                            control={<Radio
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            />} 
                                            label={ec.label}
                                            key={`equipmentCategory-${ec.label}`}
                                            sx={{
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </Box>

                        <Button
                            variant="outlined" 
                            type="submit" 
                            color="primary"
                            sx={{
                                width: "100%"
                            }}
                        >
                            Create Exercise
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}

export default CreateOutlineFormContainer;