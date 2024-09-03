import { RecordsProvider } from "./RecordsProvider";
import Layout from '../../components/layout/layout';
import RecordsTable from './components/recordsTable'


const RecordsPage = () => {
    return (
        <RecordsProvider>
            <Layout route="/records">
                <RecordsTable />
            </Layout>
        </RecordsProvider>
    )
}

export default RecordsPage;