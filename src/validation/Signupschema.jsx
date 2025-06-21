import * as Yup from "yup";

const checkEmailExists = async (email) => {
  try {
    const response = await fetch(`http://localhost:5001/users?email=${email}`);
    const users = await response.json();
    return users.length === 0; 
  } catch (error) {
    console.error("Error checking email:", error);
    return false; 
  }
};

export const signUpSchema = Yup.object().shape({
  first_name: Yup.string().min(3).max(25).required("Please enter your first name"),
  last_name: Yup.string().min(3).max(25).required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .test("checkDuplicateEmail", "Email already in use", async (value) => {
      if (!value) return true; 
      const isAvailable = await checkEmailExists(value);
      return isAvailable;
    }),
  password: Yup.string()
    .min(8, "Password should have minimum 8 characters.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain both letters and numbers")
    .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password should not contain any spaces")
    .required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  
});
