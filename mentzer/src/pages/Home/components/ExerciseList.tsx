import { useGymRatContext } from "../GymRatContext";
import ScrollableCard, { ScrollableCardItem } from "../components/scrollableCard";
import { NotionalExercise } from "../../../models/notionalExercise.model";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExerciseList = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const gymRat = useGymRatContext();
    const navigate = useNavigate();

    const goToExercisesPage = () => {
        navigate("/exercises/")
    }

    const parseExercises = (exercises: NotionalExercise[]): ScrollableCardItem[] => {
        if (exercises === undefined) {
            return []
        }

        const parsedExercises = exercises.map((e) => {
            return ({
                id: e.id,
                name: e.exercise_name,
                children: [
                    `Primary Muscle Group: ${e.primary_muscle_group.toLowerCase()}`,
                    `Exercise Scope: ${e.exercise_scope.toLowerCase()}`,
                    `Equipment Category: ${e.equipment_category.toLowerCase()}`,
                ]
            })
        })

        return parsedExercises as ScrollableCardItem[]
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                height: 1,
                flexGrow: 1,
                overflow: "auto",
                border: isSmall ? 0 : 1, 
                borderColor: theme.palette.primary.main,
                borderRadius: 2
            }}
        >
            {!isSmall && <h1 style={{ textAlign: "center", color: theme.palette.primary.main }}>Exercises</h1>}
            {gymRat.workoutOutlines && <ScrollableCard baseUrl={"stats"} items={parseExercises(gymRat.exercises)} />}
            <Container>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={goToExercisesPage}
                    sx={{
                        width: "100%",
                        mb: 2
                    }}
                >
                    Create MORE
                </Button>
            </Container>
        </Box>
    );
}

export default ExerciseList;