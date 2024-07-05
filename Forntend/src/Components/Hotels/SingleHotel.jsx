import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Rooms from "../Rooms/Rooms";

const SingleHotel = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    rating: 0,
    cheapestPrice: 0,
    featured: "",
    title: "",
    desc: "",
  });
  const params = useParams();
  const fetchHotelData = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/hotels/search/${params.id}`)
        .then((res) => {
          console.log("hotelData", res.data);
          setData(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchHotelData();
  }, [params.id]);
  return (
    <>
      <Box>
        <Card sx={{ borderRadius: 10 }}>
          <CardContent>
            <img
              src={`http://localhost:8000/${data.photos}`}
              alt={data.name}
              width={"100%"}
              height={"400px"}
              style={{
                backgroundSize: "cover",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />

            <Typography variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {data.city}
            </Typography>
            <Typography variant="body2" component="p">
              Type: {data.type}
            </Typography>
            <Typography variant="body2" component="p">
              Address: {data.address}
            </Typography>
            <Typography variant="body2" component="p">
              Rating: {data.rating}
            </Typography>
            <Typography variant="body2" component="p">
              Cheapest Price: {data.cheapestPrice}
            </Typography>
            <Typography variant="body2" component="p">
              Featured: {data.featured ? "Yes" : "No"}
            </Typography>
            <Typography variant="body2" component="p">
              Title: {data.title}
            </Typography>
            <Typography variant="body2" component="p">
              Description: {data.desc}
            </Typography>

            <Box textAlign="right">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  Navigate(`/hotels`);
                }}
              >
                Back
              </Button>
            </Box>
          </CardContent>
          <Rooms hotelId={params.id} rooms={data.rooms} setData={setData} />
        </Card>
      </Box>
    </>
  );
};

export default SingleHotel;
