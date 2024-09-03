import { Link, useNavigate } from "react-router-dom";
import { usePostAuth } from "../hooks/useGetAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import { registrationFormSchema } from "../formSchemas/registrationFormSchema";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const RegistrationForm = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const onSubmit = async (values: any, actions: any) => {
        try {
            const req = {
                username: values.username,
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password
            }
            const res = await execute(req, "/gym_rats/")
            navigate("/login")
        } catch (error) {
            alert(error);
        }
    }

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registrationFormSchema,
        onSubmit,
    });

    const {
        isLoading,
        error,
        data,
        execute,
    } = usePostAuth();
    const navigate = useNavigate();

    return (
        <Box 
            width="100%" 
            height="100%"
            display="flex"
            justifyContent="center"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
                sx={{
                    background: "black",
                    border: 1,
                    borderColor: theme.palette.primary.main,
                    borderRadius: 2,
                    width: "fit-content",
                    overflow: "auto",
                    overflowY: "scroll",
                    marginTop: 2,
                    marginBottom: 2,
                }}
                py={2}
                px={2}
                mx={2}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} px={2} py={2}>
                        <Box display="flex" justifyContent="center" sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingBottom: 2 }}>
                            <Typography variant="h3" sx={{ width: "fit-content" }} color="primary">
                                Sign Up
                            </Typography>
                        </Box>
                        <Divider />
                        <TextField 
                            variant="outlined"
                            label="First Name" 
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.firstName && touched.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
                        <TextField 
                            variant="outlined"
                            label="Last Name" 
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.lastName && touched.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                        <TextField 
                            variant="outlined"
                            label="Email" 
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <TextField 
                            variant="outlined"
                            label="Username" 
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username && <p style={{ color: "red" }}>{errors.username}</p>}
                        <TextField 
                            variant="outlined"
                            label="Password" 
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <TextField 
                            variant="outlined"
                            label="Confirm Password" 
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                        <Button variant="outlined" type="submit" color="primary">Register</Button>

                        <Box display="flex" justifyContent="center" pt={2}>
                            <Typography sx={{ width: "fit-content" }} color="primary">
                                Already have an account? Login <Link to="/login" color="primary">Here</Link>
                            </Typography>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}

export default RegistrationForm;