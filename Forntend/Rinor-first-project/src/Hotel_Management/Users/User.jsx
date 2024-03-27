import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { data } from './makeData';

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  avatar: yup.string().url('Invalid URL').required('Avatar URL is required'),
  isAdmin: yup.boolean(),
});

const User = () => {
  const columns = useMemo(
    () => [
      {
        id: 'users',
        header: 'Users',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: 'name',
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
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'username',
            header: 'Username',
            size: 200,
          },
          {
            accessorKey: 'email',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 350,
          },
          {
            accessorKey: 'isAdmin',
            header: 'Is Admin',
            size: 100,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: cell.getValue()
                    ? theme.palette.success.main
                    : theme.palette.error.main,
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

  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);

  const openCreateUserModal = () => {
    setCreateUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setCreateUserModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      isAdmin: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Add logic for creating a new user
      closeCreateUserModal();
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={openCreateUserModal}
        >
          New User
        </Button>
      </Box>
      <MaterialReactTable table={table} />
      <Dialog
        open={isCreateUserModalOpen}
        onClose={closeCreateUserModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Create New User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please fill in the details for the new user.
            </DialogContentText>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Avatar URL"
              fullWidth
              margin="normal"
              name="avatar"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              error={formik.touched.avatar && Boolean(formik.errors.avatar)}
              helperText={formik.touched.avatar && formik.errors.avatar}
            />
            <Box>
              <label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formik.values.isAdmin}
                  onChange={formik.handleChange}
                />
                &nbsp; Is Admin
              </label>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary"  style={{ position: 'absolute', right: "74%"}}>
              Create User
            </Button>
            <Button  type="submit" variant="contained" color="primary"  onClick={closeCreateUserModal}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default User;
