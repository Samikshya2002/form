import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Please enter your email"),
        password: Yup.string()
        .min(8,"Password should have minimum 8 characters.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain both letters and numbers")
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must contain at least one special character")
        .matches(/^\S*$/, "Password should not contain any spaces")
        .required("Please enter your password"),
})