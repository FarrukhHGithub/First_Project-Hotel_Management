/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, TextField, Button, Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required'),
  });

  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          values
        );
        console.log(response.data);
        resetForm();
        navigate('/');  // Navigate to the dashboard or any other route after successful login
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Grid>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80%' }}>
          <Typography variant="h5" gutterBottom>
            Submitted Data
          </Typography>
          <Typography variant="body1" gutterBottom>
            Username: {formik.values.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {formik.values.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Password: {formik.values.password}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default LoginForm;
