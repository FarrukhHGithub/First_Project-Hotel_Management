/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Grid, Box, TextField, Button, Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    country: Yup.string().required('Country is required'),
    cityname: Yup.string().required('City Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  // Initial form values
  const initialValues = {
    name: '',
    lastName: '',
    country: '',
    cityname: '',
    email: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setIsModalOpen(true);
    },
  });

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
              label="Country"
              variant="outlined"
              fullWidth
              size="small"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              margin="normal"
            />
            <TextField
              label="City Name"
              variant="outlined"
              fullWidth
              size="small"
              name="cityname"
              value={formik.values.cityname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cityname && Boolean(formik.errors.cityname)}
              helperText={formik.touched.cityname && formik.errors.cityname}
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
            Name: {formik.values.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Last Name: {formik.values.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Country: {formik.values.country}
          </Typography>
          <Typography variant="body1" gutterBottom>
            City Name: {formik.values.cityname}
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
