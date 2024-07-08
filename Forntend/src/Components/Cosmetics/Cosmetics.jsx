import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

const Cosmetics = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setCars(data.products); // Adjusted according to the correct endpoint
      })
      .catch(error => console.error('Error fetching the car data:', error));
  }, []);

  const handleDetailClick = (car) => {
    console.log('Car details:', car);
    // You can add more actions here, like navigating to a detailed page
  };

  return (
    <Grid container spacing={2} style={{ padding: 16 }}>
      {cars.map(car => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
          <Card>
            <CardMedia
              component="img"
              alt={car.title}
              height="140"
              image={car.thumbnail} // Assuming the car object has a 'thumbnail' property
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {car.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {car.description}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleDetailClick(car)}
                style={{ marginTop: '16px' }}
              >
                Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cosmetics;
