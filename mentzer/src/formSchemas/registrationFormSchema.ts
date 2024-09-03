import * as yup from "yup";

// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registrationFormSchema = yup.object().shape({
    firstName: yup.string().required("Required."),
    lastName: yup.string().required("Required."),
    email: yup.string().email("Please enter a valid email").required("Required."),
    username: yup.string().required("Required."),
    password: yup
        .string()
        .min(8)
        .matches(passwordRules, { message: "Please choose a stronger password." })
        .required("Required."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match.")
        .required("Required."),
});
