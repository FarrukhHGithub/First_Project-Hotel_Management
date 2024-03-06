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

const Rooms = () => {
  // Sample data for demonstration purposes
  const hotelData = [
    {
      tile: 'Sample Hotel 1',
      price: 'Luxury',
      Max_People: 'Cityville',
      Describtion: '123 Main Street, Cityville',
      RoomNumber: 4.5,
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
            <TableCell>tile</TableCell>
            <TableCell>price</TableCell>
            <TableCell>Max_People</TableCell>
            <TableCell>Describtion</TableCell>
            <TableCell>RoomNumber</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotelData.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.max_people}</TableCell>
              <TableCell>{row.describtion}</TableCell>
              <TableCell>{row.roomnumber}</TableCell>
              <TableCell>
              <Button onClick={() => handleEdit(row.id)} style={{ color: 'Blue', border: '2px solid Blue', marginRight: '8px' }}>
  Edit
</Button>
<Button onClick={() => handleDelete(row.id)} style={{ color: 'Red', border: '2px solid Red', marginRight: '8px' }}>
  Delete
</Button>
<Button onClick={() => handleView(row.id)} style={{ color: 'Green', border: '2px solid Green' }}>
  View
</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Rooms;
