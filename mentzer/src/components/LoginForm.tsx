import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, GYM_RAT_ID, REFRESH_TOKEN } from "../constants/authConstants";
import { usePostAuth } from "../hooks/useGetAuth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useFormik } from "formik";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

const LoginForm = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const onSubmit = async (values: any, actions: any) => {
        try {
            const res = await execute({username: values.username, password: values.password}, "/token/")
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem(GYM_RAT_ID, res.data.id);
            navigate("/")
        } catch (error) {
            alert(error);
        }
    }

    const {
        isLoading,
        error,
        data,
        execute,
    } = usePostAuth();

    const {
        values,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        onSubmit,
      });

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
                    <Stack spacing={2} py={2} px={2}>
                        <Box display="flex" justifyContent="center" sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingBottom: 2 }}>
                            <Typography variant="h3" sx={{ width: "fit-content" }} color="primary">
                                Log In
                            </Typography>
                        </Box>
                        <Divider />
                        <TextField 
                            // id="outlined-basic" 
                            label="Username" 
                            variant="outlined" 
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        <TextField 
                            // id="outlined-basic" 
                            label="Password" 
                            variant="outlined" 
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <Divider />
                        <Button variant="outlined" type="submit" color="primary">Log In</Button>
                        <Box display="flex" justifyContent="center">
                            <Typography sx={{ width: "fit-content" }} color="primary">
                                Don't have an account? Sign Up <Link to="/register" color="primary">Here</Link>
                            </Typography>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}

export default LoginForm;