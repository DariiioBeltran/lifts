import Layout from '../components/layout/layout'
import RegistrationForm from '../components/RegistrationForm';

const RegisterPage = () => {
    return (
        <Layout {...{ route: "/register/"}}>
            <RegistrationForm />
        </Layout>
    );
}

export default RegisterPage;