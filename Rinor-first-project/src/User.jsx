import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];
const Rooms = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
        size: 150,
        renderCell: (params) => (
          <div>
            {params.row.name.firstName}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.row)}
              style={{ marginLeft: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row)}
              style={{ marginLeft: 8 }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={() => handleView(params.row)}
              style={{ marginLeft: 8 }}
            >
              View
            </Button>
          </div>
        ),
      },
      // Repeat similar structure for other columns
      // ...
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
        renderCell: (params) => (
          <div>
            {params.row.state}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.row)}
              style={{ marginLeft: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row)}
              style={{ marginLeft: 8 }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={() => handleView(params.row)}
              style={{ marginLeft: 8 }}
            >
              View
            </Button>
          </div>
        ),
      },
      // ... (other columns)
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 200,
        renderCell: (params) => (
          <>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.row)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params.row)}
              style={{ marginRight: 8 }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={() => handleView(params.row)}
            >
              View
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  const handleEdit = (row) => {
    // Handle edit operation
    console.log('Edit', row);
  };

  const handleDelete = (row) => {
    // Handle delete operation
    console.log('Delete', row);
  };

  const handleView = (row) => {
    // Handle view operation
    console.log('View', row);
  };

  return <MaterialReactTable table={table} />;
};

export default Rooms;
