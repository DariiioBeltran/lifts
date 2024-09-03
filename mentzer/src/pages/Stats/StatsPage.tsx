import Layout from "../../components/layout/layout"
import { useParams } from 'react-router-dom';
import { StatsProvider } from "./StatsProvider"
import ExerciseGraph from "./components/exerciseGraph";

const StatsPage = () => {
    const { notional_exercise_id } = useParams()
    if (!notional_exercise_id) { return null; }

    return (
        <StatsProvider notionalExerciseId={parseInt(notional_exercise_id)}>
            <Layout {...{ route: "/stats/"}}>
                <ExerciseGraph />
            </Layout>
        </StatsProvider>
    )
}

export default StatsPage;