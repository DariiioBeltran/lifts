import Layout from '../components/layout/layout'
import LoginForm from '../components/LoginForm';
import Box from '@mui/material/Box';

const Login = () => {
    return (
        <Layout {...{ route: "/login/"}}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <LoginForm />
            </Box>
        </Layout>
    );
}

export default Login;