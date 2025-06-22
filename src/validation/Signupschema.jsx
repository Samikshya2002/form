import * as Yup from "yup";

const checkEmailExists = async (email) => {
  try {
    const response = await fetch(`http://localhost:5001/users?email=${email}`);
    const users = await response.json();
    return users.length === 0; // Email is available if array is empty
  } catch (error) {
    console.error("Error checking email:", error);
    return false; 
  }
};

export const signUpSchema = Yup.object().shape({
  first_name: Yup.string().min(3).max(25).required("Please enter your first name"),
  last_name: Yup.string().min(3).max(25).required("Please enter your last name"),
  role: Yup.string().required(), // You must include role here
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .test("checkRoleEmail", "Email format is not valid for this role", async function (value) {
      const { role } = this.parent;

      if (!value) return true; // Skip if empty, Yup will catch required
      
      // Role-specific email requirement
      if (role === "admin" && value !== "admin.admin@gmail.com") {
        return this.createError({ message: "Admin email must be admin.admin@gmail.com" });
      }

      if (role === "superadmin" && value !== "superadmin.superadmin@gmail.com") {
        return this.createError({ message: "Superadmin email must be superadmin.superadmin@gmail.com" });
      }

      // For all roles: Check if email is already used
      const isAvailable = await checkEmailExists(value);
      if (!isAvailable) {
        return this.createError({ message: "Email already in use" });
      }

      return true; // Passed all checks
    }),
  password: Yup.string()
    .min(8, "Password should have minimum 8 characters.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain both letters and numbers")
    .matches(/^(?=.*[!@#$%^&*(),.?\":{}|<>])/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password should not contain any spaces")
    .required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
