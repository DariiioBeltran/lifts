import Layout from '../../components/layout/layout';
import { GymRatProvider } from "./GymRatProvider";
import OutlineList from "./components/OutlineList";
import ExerciseList from "./components/ExerciseList";
import Grid from '@mui/material/Grid';
import { Hidden, Box } from '@mui/material';
import MobileHomePage from './MobileHomePage';

const Home = () => {
    return (
        <GymRatProvider>
            <Layout route="/">
                <Hidden smDown>
                    <Grid 
                        container 
                        spacing={4} 
                        direction="row" 
                        sx={{
                            justifyContent: "center",
                            alignItems: "stretch",
                        }}
                    >
                        <Grid item md={6}>
                            <OutlineList />
                        </Grid>
                        <Grid item md={6}>
                            <ExerciseList />
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <MobileHomePage />
                </Hidden>
            </Layout>
        </GymRatProvider>
    );
}

export default Home;