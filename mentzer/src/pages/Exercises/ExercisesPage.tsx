import Layout from "../../components/layout/layout"
import CreateOutlineFormContainer from "./components/CreateExerciseForm"

const ExercisesPage = () => {
    return (
        <Layout route="/exercises">
            <CreateOutlineFormContainer />
        </Layout>
    )
}

export default ExercisesPage;