import * as yup from "yup";

const regFormValidationSchema = yup.object().shape({

    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "Minimum 2 characters"),

    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Minimum 2 characters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),

    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone must contain numbers only")
        .min(8, "Phone number is too short"),

    address: yup
        .string()
        .required("Address is required")
        .min(3, "Address is too short"),

    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),

    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf(
            [yup.ref("password"), null],
            "Passwords do not match"
        ),

    profilePic: yup
        .string()
        .url("Enter a valid image URL")
        .nullable(),

});

export default regFormValidationSchema;