import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleUser = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: true,
  });
  const params = useParams();
  const fetchUserData = async (params) => {
    try {
      await axios
        .get(`http://localhost:8000/api/users/${params.id}`)
        .then((res) => {
          setData(res.data.user);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUserData(params);
  });
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {`${data.firstName} ${data.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          Email: {data.email}
        </Typography>
        <Typography variant="body2" component="p">
          IsAdmin: {data.isAdmin ? "Yes" : "No"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleUser;
