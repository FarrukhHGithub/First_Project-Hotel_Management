import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch hotel data using Axios
    axios
      .get("http://localhost:8000/api/hotels/hotels")
      .then((response) => {
        response.data.map(
          (res) => (res.photos = `http://localhost:8000/${res.photos}`)
        );
        setHotels(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotel data:", error);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      {hotels.map((hotel) => (
        <Grid item xs={12} sm={6} md={4} key={hotel._id}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={hotel.photos}
                alt={hotel.name}
              />

              <CardContent>
                <Typography variant="h6" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {hotel.type} - {hotel.city}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {hotel.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Rating: {hotel.rating}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Cheapest Price: {hotel.cheapestPrice}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HotelList;
