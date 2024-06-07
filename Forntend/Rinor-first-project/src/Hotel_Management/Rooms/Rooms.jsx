/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

import {
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Room = ({ hotelId, rooms }) => {
  const Navigate = useNavigate();
  const [id, setId] = useState("");
  const [roomData, setRoomData] = useState({
    title: "",
    photos: null,
    price: "",
    bed: "",
    maxPeople: "",
    status: false,
    desc: "",
  });

  const resetForm = () => {
    setRoomData({
      title: "",
      photos: null,
      price: "",
      bed: "",
      maxPeople: "",
      status: false,
      desc: "",
    });
  };

  // const handleChange = (event) => {
  //   const { name, value, type } = event.target;
  //   const newValue =
  //     type === "checkbox"
  //       ? event.target.checked
  //       : type === "file"
  //       ? event.target.files[0]
  //       : value;
  //   setRoomData({ ...roomData, [name]: newValue });
  // };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (id === "") {
      const formData = new FormData();
      Object.entries(roomData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios
        .post(`http://localhost:8000/api/room/${hotelId}`, formData)
        .then((res) => console.log("reponse", res.data));
      resetForm();
      setIsModalOpen(false);
    } else {
      // console.log("id", id);
      await handleUpdate(id);
    }
  };

  const handleUpdate = async (id) => {
    try {
      console.log("id", id);
      const formData = new FormData();
      Object.entries(roomData).forEach(([key, value]) => {
        if (key !== "rooms") {
          formData.append(key, value);
        }
      });
      await axios
        .put(`http://localhost:8000/api/room/${id}`, formData)
        .then((res) => {
          resetForm();
          setId("");
          console.log("res", res);
          setIsModalOpen(false);
        });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const columns = useMemo(
    () => [
      {
        id: "rooms",
        header: "All Rooms",
        columns: [
          {
            accessorKey: "titleAndPhotos",
            header: "Title & Photos",
            size: 50,
            Cell: ({ row }) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt="room"
                  height={50}
                  src={`http://localhost:8000/${row.original.photos}`}
                  loading="lazy"
                  style={{ border: "2px solid teal", borderRadius: "5px" }}
                />
                <div>{row.original.title}</div>
              </Box>
            ),
          },
          {
            accessorKey: "bed",
            header: "Bed",
            size: 50,
          },
          {
            accessorKey: "maxPeople",
            header: "Capacity",
            size: 50,
          },
          {
            accessorKey: "price",
            header: "Price",
            size: 50,
          },
          {
            accessorKey: "status",
            header: "Status",
            size: 100,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: !cell.getValue()
                    ? theme.palette.success.main
                    : theme.palette.warning.main,
                  color: "#fff",
                  borderRadius: "0.25rem",
                  padding: "0.25rem",
                  fontWeight: "500",
                })}
              >
                {!cell.getValue() ? "Available" : "Booked"}{" "}
                {/* Updated logic to display Paid or Unpaid */}
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rooms
      ? rooms
      : {
          title: "",
          photos: null,
          price: "",
          bed: "",
          maxPeople: "",
          status: false,
          desc: "",
        },

    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          left: "30px",
          maxWidth: "1000px",
          position: "sticky",
          width: "100%",
        }}
      >
        <img
          alt="room"
          height={300}
          src={row.original.avatar}
          loading="lazy"
          style={{ border: "5px solid teal", borderRadius: "5px" }}
        />
      </Box>
    ),
    renderRowActionMenuItems: (params) => [
      <MenuItem
        key="view"
        onClick={() => {
          Navigate(`/room/${hotelId}/${params.row.original._id}`);
          params.closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Visibility />
        </ListItemIcon>
        View
      </MenuItem>,
      <MenuItem
        key="edit"
        onClick={() => {
          setRoomData(
            rooms.find((item) => item._id === params.row.original._id)
          );
          setId(params.row.original._id);
          setIsModalOpen(true);
          params.closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          params.closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],
  });

  return (
    <>
      <Box mb={2} textAlign="right">
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          ADD NEW+
        </Button>
      </Box>
      <MaterialReactTable table={table} />

      {/* New Room Form */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: "90%",
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <form onSubmit={handleCreateRoom}>
            <Typography variant="h5">
              {id === "" ? "Add New room" : "Update Current room"}
            </Typography>
            <TextField
              variant="standard"
              label="Title"
              name="title"
              value={roomData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="standard"
              type="file"
              label="Photos"
              name="photos"
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              variant="standard"
              label="Rent"
              name="price"
              value={roomData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="standard"
              label="Bed"
              name="bed"
              value={roomData.bed}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="standard"
              label="Max People"
              name="maxPeople"
              value={roomData.maxPeople}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              variant="standard"
              label="Description"
              name="desc"
              value={roomData.desc}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="status"
                  checked={roomData.status}
                  onChange={handleChange}
                />
              }
              label="Status"
            />

            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                {id === "" ? "Add room" : "Update room"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Room;
