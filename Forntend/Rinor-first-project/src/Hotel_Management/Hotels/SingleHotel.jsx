import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rooms from './Rooms' // Ensure the path is correct based on your file structure

const SingleHotel = () => {
  const [data, setData] = useState({
    name: "",
    city: "",
    address: "",
    rating: 0,
    cheapestPrice: 0,
    desc: "",
    featured: "",
    title: "",
    type: "",
  });
  const params = useParams();

  const fetchHotelData = async (params) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/hotel/find/${params.id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHotelData(params);
  }, []);

  return (
    <div>
      <Card style={{ width: '50%', marginTop: '3%', marginLeft: '10%' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Location: <b/>{data.city}
          </Typography>
          <Typography variant="body2" component="p">
            Address: {data.address}
          </Typography>
          <Typography variant="body2" component="p">
            Type: {data.type}
          </Typography>
          <Typography variant="body2" component="p">
            Rating: {data.rating}
          </Typography>
          <Typography variant="body2" component="p">
            Title: {data.title}
          </Typography>
          <Typography variant="body2" component="p">
            Cheapest Price: {data.cheapestPrice}
          </Typography>
          <Typography variant="body2" component="p">
            Description: {data.desc}
          </Typography>
          <Typography variant="body2" component="p">
            Featured: {data.featured ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Card>
      <Rooms hotelId={params.id} /> {/* Pass hotelId as a prop */}
    </div>
  );
};

export default SingleHotel;
