import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Modal,
} from "@mui/material";
import { useParams } from "react-router-dom";
    
const RoomDetails = () => {
  const { hotelId, roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    fromDate: "",
    toDate: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/room/${roomId}`
        );
        setRoom(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    console.log("Room Data", room);
  }, [roomId]);

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading room details</Typography>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("booking details:", formData);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/booking/${hotelId}/${roomId}`,
        formData
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage("Failed to book the room.");
    } finally {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ borderRadius: 10 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <img
                src={`http://localhost:8000/${room.photos}`}
                alt={room.title}
                width={"100%"}
                height={"400px"}
                style={{
                  backgroundSize: "cover",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <Typography variant="h5" component="h2" sx={{ marginTop: 2 }}>
                {room.title}
              </Typography>

              <Typography variant="body2" component="p">
                Room Bed: {room.bed} Bed
              </Typography>
              <Typography variant="body2" component="p">
                Occupancy: {room.maxPeople} Persons
              </Typography>
              <Typography variant="body2" component="p">
                View: Sea View
              </Typography>
              <Typography variant="body2" component="p">
                Description: {room.desc}
              </Typography>
              {room.unavailableDates && (
                <Typography variant="h5" component="h3" sx={{ color: "red" }}>
                  Unavailable Dates: {room.unavailableDates}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginTop: 2 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
              >
                Book Room
              </Typography>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  size="small"
                  label="Contact"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  size="small"
                  label="Check In"
                  type="datetime-local"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  size="small"
                  label="Check Out"
                  type="datetime-local"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  sx={{ borderRadius: 25 }}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  Book Now
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="response-modal-title"
        aria-describedby="response-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="response-modal-title" variant="h6" component="h2">
            Booking Response
          </Typography>
          <Typography id="response-modal-description" sx={{ mt: 2 }}>
            {responseMessage}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RoomDetails;