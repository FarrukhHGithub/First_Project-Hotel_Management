/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  ListItemIcon,
  MenuItem,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

const User = () => {
  const Navigate = useNavigate();
  const [userList, setuserList] = useState([]);
  const [id, setId] = useState("");
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    isAdmin: true,
  });

  const resetForm = () => {
    setuserData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      isAdmin: true,
    });
  };
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "checkbox" ? event.target.checked : value;
    setuserData({ ...userData, [name]: newValue });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const fetchuserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setuserList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleModalClose = async () => {
    if (id === "") {
      await axios.post("http://localhost:8000/api/users/", userData);
    } else {
      await handleUpdate(id); // Call handleUpdate directly
    }
    resetForm();
    setId(""); // Reset id after handling the update or insert
    setIsModalOpen(false);
  };

  const handleUpdate = async (id) => {
    try {
      console.log("id", id);

      await axios.put(`http://localhost:8000/api/users/${id}`, userData);
      // Reset form and close modal after successful update
      resetForm();
      setId("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  let handleDelete = async (id) => {
    // console.log("id", id);
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the data?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8000/api/users/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchuserData();
  }, [userList]);

  const columns = useMemo(
    () => [
      {
        id: "Users-Identities",
        header: "Users-Identities",
        columns: [
          {
            accessorKey: "firstName",
            id: "firstName",
            header: "First Name",
            size: 200,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  alt="avatar"
                  height={50}
                  src={row.original.photos[0]}
                  loading="lazy"
                  style={{ border: "2px solid teal", borderRadius: "5px" }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "lastName",
            header: "Last Name",
            size: 150,
          },
          {
            accessorKey: "username",
            header: "Username",
            size: 150,
          },
          {
            accessorKey: "email",
            header: "Email",
            size: 150,
          },
          {
            accessorFn: (row) => (row.isAdmin ? "Yes" : "No"),
            id: "isAdmin",
            header: "isAdmin",
            size: 150,
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: userList,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    getRowId: (row) => row.id,
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
          flexDirection: "column",
          justifyContent: "center",
          padding: "16px",
          textAlign: "center",
          maxWidth: "100%",
        }}
      >
        <img
          alt="avatar"
          src={row.original.photos[0]}
          loading="lazy"
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "2px solid teal",
            borderRadius: "5px",
            marginBottom: "16px",
          }}
        />
        <Typography variant="h5" sx={{ marginBottom: "8px" }}>
          {row.original.title}
        </Typography>
        <Typography variant="body1">{row.original.desc}</Typography>
      </Box>
    ),

    renderRowActionMenuItems: (params) => [
      <MenuItem
        key="view"
        onClick={() => {
          Navigate(`/user/${params.row.original._id}`);
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
          setuserData(
            userList.find((item) => item._id === params.row.original._id)
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
          handleDelete(params.row.original._id);
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
        {/* <Button variant="contained" color="primary" onClick={handleModalOpen}>
          ADD NEW+
        </Button> */}
      </Box>
      <MaterialReactTable table={table} />

      {/* New Hotels Form */}
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
          <form>
            <Typography variant="h5">Update User</Typography>
            <TextField
              variant="standard"
              label="firstName"
              fullWidth
              margin="normal"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="lastName"
              fullWidth
              margin="normal"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="username"
              fullWidth
              margin="normal"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Email"
              fullWidth
              margin="normal"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={userData.isAdmin}
                  onChange={handleChange}
                  name="isAdmin"
                />
              }
              label="Yes"
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={!userData.isAdmin}
                  onChange={(e)=>handleChange({...e,target:{name:"isAdmin", value:!userData.isAdmin}})}
                  name="isAdmin"
                />
              }
              label="No"
            />
            {/* Other TextField components */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalClose}
              >
                {id === "" ? "Add Hotel" : "Update User"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default User;
