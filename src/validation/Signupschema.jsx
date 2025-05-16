import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
    first_name: Yup.string().min(3).max(25).required("Please enter your first name"),
    last_name: Yup.string().min(3).max(25).required("Please enter your last name"),
    email: Yup.string().email("Invalid email format").required("Please enter your email"),
    password: Yup.string()
    .min(8,"Password should have minimum 8 characters.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain both letters and numbers")
    .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password should not contain any spaces")
    .required("Please enter your password"),
    confirm_password: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password'),null], "Password must match"),
});