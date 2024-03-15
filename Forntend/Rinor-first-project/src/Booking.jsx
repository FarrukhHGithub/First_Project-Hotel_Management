import React from 'react';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  ListItemIcon,
  MenuItem,
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { data } from './bookingData';

const Bookings = () => {
  const columns = useMemo(
    () => [
      {
        id: 'users',
        header: 'All Bookings',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: 'name',
            header: 'Name',
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
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: '50%' }}
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
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
          // {
          //   accessorKey: 'isPaid', // Corrected accessorKey
          //   header: 'Payment', // Changed header
          //   size: 150,
          //   // Cell: ({ cell }) => (
          //   //   <Box
          //   //     component="span"
          //   //     sx={(theme) => ({
          //   //       backgroundColor: cell.getValue() ? theme.palette.success.main : theme.palette.error.main,
          //   //       color: '#fff',
          //   //       borderRadius: '0.25rem',
          //   //       padding: '0.25rem',
          //   //       fontWeight: 'bold',
          //   //     })}
          //   //   >
          //   //     {cell.getValue() ? 'Paid' : 'Unpaid'} {/* Updated logic to display Paid or Unpaid */}
          //   //   </Box>
          //   // ),
          // },
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
        <Button variant="contained" color="primary">ADD NEW+</Button>
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Bookings;