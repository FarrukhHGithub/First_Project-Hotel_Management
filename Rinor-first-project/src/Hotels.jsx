import { useMemo } from 'react';
// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// Material UI Imports
import {
  Box,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import {
  Button,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
// Icons Imports
// Users Data
import { data } from './makeData';

const Hotels = () => {
  const columns = useMemo(
    () => [
      {
        id: 'users', // id used to define `group` column
        header: 'Users',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, // accessorFn used to join multiple data into a single cell
            id: 'name', // id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'username', // Added column for username
            header: 'Username',
            size: 200, // Adjust size as needed
          },
          {
            accessorKey: 'email', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 350,
          },
          {
            accessorKey: 'isAdmin', // Added column for isAdmin
            header: 'Is Admin',
            size: 100, // Adjust size as needed
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue() ? theme.palette.success.main : theme.palette.error.main,
                  color: '#fff',
                  borderRadius: '0.25rem',
                  padding: '0.25rem',
                  fontWeight: 'bold',
                })}
              >
                {cell.getValue() ? 'Yes' : 'No'}
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
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
          height={200}
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
          console.log("Edit Clicked");
          const selectedRows = table.getSelectedRowModel().flatRows;
          selectedRows.forEach(row => table.editRow(row.id));
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
  selectedRows.forEach(row => {
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        {/* Create button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            // Add your logic for creating a new table or handling the create action
            console.log("Create Clicked");
          }}
        >
          Create
        </Button>
      </Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default Hotels;