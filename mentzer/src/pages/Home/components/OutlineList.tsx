import { useGymRatContext } from "../GymRatContext";
import ScrollableCard, { ScrollableCardItem } from "../components/scrollableCard";
import { WorkoutOutline} from "../../../models/gymRat.model";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const OutlineList = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const gymRat = useGymRatContext();
    const navigate = useNavigate();

    const goToOutlinesPage = () => {
        navigate("/outlines/")
    }

    const parseWorkoutOutlines = (outlines: WorkoutOutline[]): ScrollableCardItem[] => {
        if (outlines === undefined) {
            return []
        }
    
        const parsedOutlines = outlines.map((outline) => {
            if (!outline.exercise_outlines) {
                return {name: outline.workout_outline_name, items: []}
            }
            return ({
                id: outline.id,
                name: outline.workout_outline_name,
                children: outline.exercise_outlines.map((eo) => {
                    return (
                        `${eo.notional_exercise.exercise_name}: ${eo.number_of_sets} sets of ${eo.number_of_reps} reps`
                    );
                })
            });
        });
    
        return parsedOutlines as ScrollableCardItem[]
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
            {!isSmall && <h1 style={{ textAlign: "center", color: theme.palette.primary.main }}>Workout Outlines</h1>}
            {gymRat.workoutOutlines && <ScrollableCard baseUrl={"log"} items={parseWorkoutOutlines(gymRat.workoutOutlines)} />}
            <Container>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={goToOutlinesPage}
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

export default OutlineList;