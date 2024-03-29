import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/hotels/hotel-image.jpg" // Update image URL to represent a hotel
        title="Hotel Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hotel Name {/* Replace with actual hotel name */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description of the hotel. {/* Add relevant hotel description */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: City, Country {/* Add hotel location */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price per night: $XXX {/* Add pricing information */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Book Now</Button> {/* Change to book button */}
        <Button size="small">View Details</Button> {/* Change to view details button */}
      </CardActions>
    </Card>
  );
}
