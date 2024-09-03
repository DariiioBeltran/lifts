import { useOutlinesContext } from "../OutlinesContext"
import OutlineName from "./OutlineName";
import SelectExercises from "./SelectExercises";
import SetsAndRepsTable from "./SetsAndRepsTable";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import { useCreateOutline, CreateOutlineRequest, ExerciseOutlineRequest } from "../../../hooks/useCreateOutline";
import { GYM_RAT_ID } from "../../../constants/authConstants";
import { useNavigate } from "react-router-dom";
import { NotionalExercise } from "../../../models/notionalExercise.model";

// TODO:
// 1. Fix this so the values of the forms persist when we return (maybe the key is to not make the child components forms?)
// 2. ADD VALIDATION
// 3. Maybe add a review step where we prompt user to double check that everything looks correct?

const CreateOutlineStepper = () => {
    const navigate = useNavigate();
    const { exercises } = useOutlinesContext();
    const {
        isLoading,
        error,
        data,
        execute,
    } = useCreateOutline();

    const [outlineName, setOutlineName] = useState<string>("");
    const [selectedExercises, setSelectedExercises] = useState<NotionalExercise[]>([] as NotionalExercise[]);
    const [setsAndReps, setSetsAndReps] = useState<ExerciseOutlineRequest[]>([] as ExerciseOutlineRequest[]);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleGlobalSubmission = () => {
        try {
            const req = {
                gym_rat: parseInt(localStorage.getItem(GYM_RAT_ID) || "0"),
                workout_outline_name: outlineName,
                exercise_outlines: setsAndReps,
            };
            execute(req as CreateOutlineRequest)
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    // define steps labels
    const steps = ["Name your workout outline", "Select your exercises", "Sets and reps for each exercise"]

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <OutlineName localSubmit={setOutlineName} handleNext={handleNext} />;
            case 1:
                return <SelectExercises exercises={exercises} localSubmit={setSelectedExercises} handleNext={handleNext} />;
            case 2:
                return <SetsAndRepsTable selectedExercises={selectedExercises} localSubmit={setSetsAndReps} handleNext={handleNext} />;
            default:
                return <div>Not Found</div>;
        }
    }

  return (
    <Box display="flex" justifyContent="center" sx={{ height: "75%" }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
            width: "75%",
            "& .MuiStep-root": {
                "& .MuiStepLabel-root": {
                  padding: 0,
                  height: '20px'
                }
              },
              "& .MuiStepConnector-root": {
                marginLeft: "11px"
            }
        }}
        connector={<StepConnector sx={{
          [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: 'transparent',
            },
          },
          [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: 'transparent',
            },
          },
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'transparent',
            borderTopWidth: 3,
            borderRadius: 1,
          },
        }} />}
    >
        {steps.map((step, index) => (
            <Step key={step} sx={{ height: "75%" }}>
                <StepLabel
                    optional={
                        index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                        ) : null
                    }
                >
                    <h1>{step}</h1>
                </StepLabel>
                <StepContent style={{ width: "100%", height: "100%"}}>
                    <div style={{ paddingTop: "20px" }}>{renderStepContent(activeStep)}</div>
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                form={`form-step${activeStep}`}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                            </Button>
                            <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                        </div>
                    </Box>
                </StepContent>
            </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Is this ready or what cuz?</Typography>
          <Button onClick={handleGlobalSubmission} sx={{ mt: 1, mr: 1 }}>
            GLOBAL SUBMISSION
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default CreateOutlineStepper;