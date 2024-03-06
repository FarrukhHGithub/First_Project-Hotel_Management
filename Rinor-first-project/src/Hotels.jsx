import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const Hotels = () => {
  // Sample data for demonstration purposes
  const hotelData = [
    {
      id: 1,
      name: 'Sample Hotel 1',
      type: 'Luxury',
      cityName: 'Cityville',
      address: '123 Main Street, Cityville',
      rating: 4.5,
      rooms: 100,
    },
    {
      id: 2,
      name: 'Sample Hotel 2',
      type: 'Budget',
      cityName: 'Townsville',
      address: '456 Broad Street, Townsville',
      rating: 3.8,
      rooms: 50,
    },
    // Add more hotel data as needed
  ];

  const handleEdit = (id) => {
    // Handle edit operation
    console.log(`Edit hotel with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete operation
    console.log(`Delete hotel with ID: ${id}`);
  };

  const handleView = (id) => {
    // Handle view operation
    console.log(`View hotel with ID: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Rooms</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotelData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.cityName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell>{row.rooms}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(row.id)} style={{color:'Blue'}}>Edit</Button>
                <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                <Button onClick={() => handleView(row.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Hotels;
