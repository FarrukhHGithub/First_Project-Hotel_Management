/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Grid, Box, TextField, Button, Modal, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  ////<<<<<<<<<<<<<< Validation schema using Yup  >>>>>>>>>>>>>>/////
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string()
      .required("Username is required")
      .test("is-lowercase", "Username must be in lowercase", (value) => {
        return value === value.toLowerCase();
      }),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Confirm Password is incorrect")
      .required("Confirm The Typed Password"),
  });
  /////<<<<<<<< Initial form values >>>>>>>>//////
  const initialValues = {
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          values
        );
        console.log(response.data);
        resetForm();
        handleOpen();
        navigate("/login"); // Navigate to the login page after successful registration
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={8} lg={4}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="FirstName"
              variant="outlined"
              fullWidth
              size="small"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              size="small"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              size="small"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <TextField
              label="confirmPassword"
              variant="outlined"
              fullWidth
              size="small"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Grid>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "80%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Submitted Data
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {formik.values.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Last Name: {formik.values.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            password: {formik.values.password}
          </Typography>
          <Typography variant="body1" gutterBottom>
            confirmPassword: {formik.values.confirmPassword}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {formik.values.email}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default RegisterForm;
