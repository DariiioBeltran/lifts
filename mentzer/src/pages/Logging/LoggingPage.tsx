import { useParams } from 'react-router-dom';
import Layout from "../../components/layout/layout";
import { LoggingProvider } from "./LoggingProvider"
import LoggingFormContainer from "./components/LoggingForm";


const LoggingPage = () => {
    const { id } = useParams()
    if (!id) { return null; }

    return (
        <LoggingProvider id={parseInt(id)}>
            <Layout {...{ route: "/log/"}}>
                <LoggingFormContainer />
            </Layout>
        </LoggingProvider>
    )
}

export default LoggingPage;