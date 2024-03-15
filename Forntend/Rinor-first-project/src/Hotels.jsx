import React, { useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { data } from './HotelData';

const AddHotelModal = ({ isOpen, onClose, onAddHotel }) => {
  const [hotelData, setHotelData] = useState({
    name: '',
    type: '',
    city: '',
    avatar: '',
    address: '',
    title: '',
    description: '',
    rating: '',
    rooms: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddHotel = () => {
    onAddHotel(hotelData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          p: 2,
        }}
      >
        <h2>Add new Hotel</h2>
        <TextField
          label="Name"
          name="name"
          value={hotelData.name}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap

        />
        <TextField
          label="Type"
          name="type"
          value={hotelData.type}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap

        />
        <TextField
          label="City"
          name="city"
          value={hotelData.city}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap

        />
         {/* <TextField
          label="Address"
          name="address"
          value={hotelData.address}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap
        /> */}
         <TextField
          label="Photos"
          name="photo"
          value={hotelData.photo}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap

        />
        <TextField
          label="Title"
          name="title"
          value={hotelData.title}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap
          />
        <TextField
          label="Description"
          name="description"
          value={hotelData.description}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: '16px' }} // Add margin bottom for a gap
          />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddHotel}
        >
          Add Hotel
        </Button>
      </Box>
    </Modal>
  );
};

const Hotels = () => {
  const columns = useMemo(
    () => [
      {
        id: 'hotels',
        header: 'Hotels',
        columns: [
          {
            accessorFn: (row) => row.hotelName,
            id: 'hotelName',
            header: 'Hotel Name',
            size: 200,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="hotel-photo"
                  height={30}
                  src={row.original.photo}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'type',
            header: 'Type',
            size: 150,
          },
          {
            accessorKey: 'city',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'City',
            size: 180,
          },
          {
            accessorKey: 'photo',
            header: 'Photo',
            Cell: ({ row }) => (
              <img
                alt="avatar"
                height={50}
                src={row.original.avatar}
                loading="lazy"
                style={{ borderRadius: '5px' }}
              />
            ),
          },
          {
            accessorKey: 'title',
            header: 'Title',
            size: 200,
          },
          {
            accessorKey: 'rooms',
            header: 'Rooms',
            size: 100,
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '30px',
          maxWidth: '1000px',
          position: 'sticky',
          width: '100%',
        }}
      >
        <img
          alt="avatar"
          height={180}
          src={row.original.avatar}
          loading="lazy"
          style={{ borderRadius: '50%' }}
        />
        <Box sx={{ marginLeft: '20px' }}>
          <div>
            <strong>Description:</strong> {row.original.description}
          </div>
          <div>
            <strong>Rating:</strong> {row.original.rating}
          </div>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu, table }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          console.log('Edit Clicked');
          const selectedRows = table.getSelectedRowModel().flatRows;
          selectedRows.forEach((row) => table.editRow(row.id));
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
          selectedRows.forEach((row) => {
            // Perform the desired action, e.g., deleting the row
            table.deleteRow(row.id);
          });
          // Close the menu after performing the action
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddHotel = (hotelData) => {
    // Add your logic for handling the create action with hotelData
    console.log('Create Clicked with data:', hotelData);
    // Close the modal after handling the action
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        {/* Create button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
        >
          Add new Hotel
        </Button>
      </Box>
      <MaterialReactTable table={table} />

      {/* Add Hotel Modal */}
      <AddHotelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddHotel={handleAddHotel}
      />
    </Box>
  );
};

export default Hotels;
