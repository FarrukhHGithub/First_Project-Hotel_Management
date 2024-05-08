import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  ListItemIcon,
  MenuItem,
  Button,
  Modal,
  TextField,
} from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { data } from './bookingData';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [arrive, setArrive] = useState('');
  const [depart, setDepart] = useState('');
  const [bookingList, setBookingList] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = async () => {
    try {
      await axios.post("http://localhost:8000/api/booking/", {
        roomId,
        hotelId,
        arrive,
        depart
      });
      // Assuming successful addition, fetch updated data
      fetchBookingData();
      closeModal();
    } catch (error) {
      console.error("Error adding new booking:", error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/booking/list");
      setBookingList(response.data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [bookingList]);

  const columns = [
    {
      id: 'users',
      header: 'All Bookings',
      columns: [
        {
          accessorFn: (row) => `${row.hotelId} ${row.hotelId}`,
          id: 'hotelId',
          header: 'Hotel ID',
          size: 200,
        },
        {
          accessorKey: 'roomId',
          header: 'Room ID',
          size: 150,
        },
        {
          accessorKey: 'mobile',
          header: 'Mobile',
          size: 150,
        },
        {
          accessorKey: 'arrive',
          header: 'Arrive',
          size: 150,
        },
        {
          accessorKey: 'depart',
          header: 'Depart',
          size: 150,
        },
      ],
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: bookingList,
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
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
        alignItems: 'left',
        // display: 'flex',
        justifyContent: 'space-around',
        left: '30px',
        maxWidth: '1000px',
        position: 'sticky',
        width: '100%',
        }}
      >
        <img
          alt="avatar"
          height={150}
          src={row.original.avatar}
          loading="lazy"
          style={{ borderRadius: '50%' }}
        />
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu, table }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          // Edit logic...
          closeMenu();
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
          const selectedRows = table.getSelectedRowModel().flatRows;
          selectedRows.forEach(row => table.deleteRow(row.id));
          closeMenu();
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
        <Button variant="contained" color="primary" onClick={openModal}>ADD NEW+</Button>
      </Box>
      <MaterialReactTable table={table} />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="add-new-booking-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h2 id="add-new-booking-modal">Add New Booking</h2>
          <TextField
            id="roomId"
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            id="hotelId"
            label="Hotel ID"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            id="arrive"
            label="Arrive"
            type="date"
            value={arrive}
            onChange={(e) => setArrive(e.target.value)}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            id="depart"
            label="Depart"
            type="date"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddNew}>Add</Button>
          <Button variant="contained" color="primary"style={{ position: 'absolute', top: "85.7%", right: 10}} onClick={closeModal}>close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Bookings;




