import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
    first_name: Yup.string().min(3).max(25).required("Please enter your first name"),
    last_name: Yup.string().min(3).max(25).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
    .min(8,"Password should have minimum 8 characters.")
    .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must contain at least one special character")
    .matches(/[^\s]*$/, "Password should have any space")
    .required("Please enter your password"),
    confirm_password: Yup.string().required("Password is required").oneOf([Yup.ref('password'),null], "Password must match"),
});