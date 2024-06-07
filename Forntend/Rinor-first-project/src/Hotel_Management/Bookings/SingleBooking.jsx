import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBooking = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    contact: "",
    fromDate: "",
    toDate: "",
    hotelId: "",
    hotelName: "",
    hotelCity: "",
    hotelAddress: "",
    roomName: "",
  });

  // const [hotelData, setHotelData] = useState({
  //   name: "",
  //   type: "",
  //   city: "",
  //   address: "",
  //   rating: 0,
  //   cheapestPrice: 0,
  //   featured: false,
  //   title: "",
  //   desc: "",
  // });

  const params = useParams();

  const fetchBookingData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/booking/${params.id}`
      );
      const { _doc, ...rest } = res.data.booking;
      setBookingData({ ..._doc, ...rest });
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  

  useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5">Hotel Detail</Typography>
          <Typography variant="h4" component="h2">
            {bookingData.hotelName}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {bookingData.hotelCity}
          </Typography>
          <Typography color="body2" component="p">
            Room Title: {bookingData.roomName}
          </Typography>

          <Typography variant="body2" component="p">
            Address: {bookingData.hotelAddress}
          </Typography>

          <Typography variant="h5" sx={{ mt: 2 }}>
            Booking Details
          </Typography>
          <Typography variant="h4" component="h2">
            Name: {bookingData.name}
          </Typography>
          <Typography variant="body2" component="p">
            Contact: {bookingData.contact}
          </Typography>
          <Typography variant="body2" component="p">
            From Date: {bookingData.fromDate}
          </Typography>
          <Typography variant="body2" component="p">
            To Date: {bookingData.toDate}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleBooking;