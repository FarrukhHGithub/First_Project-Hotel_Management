/* eslint-disable react/no-unescaped-entities */
import  { useState } from 'react';
import { Grid, Box, TextField, Button, Modal, Typography } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    Country: '',
    cityname:' ',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="last-Name"
              variant="outlined"
              fullWidth
              size="small"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              size="small"
              type="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              margin="normal"
            />
             <TextField
              label="City-Name"
              variant="outlined"
              fullWidth
              size="small"
              type="Cityname"
              name="cityname"
              value={formData.cityName}
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Submit
            </Button>
            {/* <Typography variant="body1" sx={{ marginTop: 2 }} align="center">
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography> */}
          </form>
        </Box>
      </Grid>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80%' }}>
          <Typography variant="h5" gutterBottom>
            Submitted Data
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {formData.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Last Name: {formData.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Country: {formData.country}
          </Typography>
          <Typography variant="body1" gutterBottom>
            City Name: {formData.cityname}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default RegisterForm;
