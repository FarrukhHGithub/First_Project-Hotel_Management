import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleUsers = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    isAdmin: true,
  });
  const params = useParams();
  const fetchHotelData = async (params) => {
    try {
      await axios
        .get(`http://localhost:8000/api/user/:${params.id}`)
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchHotelData(params);
  }, []);
  return (
    <Card style={{ width: '50%', marginTop: '3%', marginLeft:'10%' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.name}
        </Typography>
        <Typography color="h6" gutterBottom>User-Detail:<b/>  
          {data.city}
        </Typography>
        <Typography variant="body2" component="p">
        firstName: {data.firstName}
        </Typography>
        <Typography variant="body2" component="p">
        lastName: {data.lastName}
        </Typography>
        <Typography variant="body2" component="p">
        username: {data.username}
        </Typography>
        <Typography variant="body2" component="p">
        email: {data.email}
        </Typography>
        <Typography variant="body2" component="p">
        isAdmin: {data.isAdmin}
        </Typography>
        {/* <Typography variant="body2" component="p">
          Description: {data.desc}
        </Typography> */}
        <Typography variant="body2" component="p">
          Featured: {data.featured ? "Yes" : "No"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleUsers;