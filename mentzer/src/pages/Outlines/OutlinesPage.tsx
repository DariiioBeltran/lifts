import Layout from "../../components/layout/layout"
import { OutlineProvider } from "./OutlineProvider";
import CreateOutlineFormContainer from "./components/CreateOutlineFormContainer";

const OutlinesPage = () => {
    return (
        <OutlineProvider>
            <Layout {...{ route: "/outlines/"}}>
                <CreateOutlineFormContainer />
            </Layout>
        </OutlineProvider>
    );
}

export default OutlinesPage;